import _, { take } from "underscore";

import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'svelniejibiciuliai4@gmail.com',
    pass: 'wgie mtpt thrb bzfv'
  }
});

/**
 * Returns permission id: 1=regular, 2=userPlus, 3=mod, 4=admin
 * @param id:number
 */
const getUserPermissions = async (id: number) => {
  const user: any = await prisma.user.findFirst({
    where: { id: id },
    include: { user_role: true },
  });
  if (user == null) {
    return -1;
  } else {
    return user.user_role[0].role_id;
  }
};
/**
 * Fetches id, username & roles of every user INCLUDING user_role object that contains role_id parameter.
 * role_id can be either: 1 (regular user), 2 (userPlus), 3 (moderator), 4 (admin)
 * Can only be used by mod/admin roles
 */
const getAllUsers = async (req: express.Request, res: express.Response) => {
  if (req.tokenInfo !== undefined && req.tokenInfo.role_id < 3)
    return res.status(403).json({ message: "Access denied." });
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        user_role: true,
      },
    });
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
/**
 * Fetches 1 user's id and username based on id parameter.
 * Body requires: id
 * Can only be used by user to whom data belongs or mod/admin
 */
const getOneUser = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  if (
    req.tokenInfo !== undefined &&
    req.tokenInfo.role_id <= 2 &&
    req.tokenInfo.id != id
  )
    return res.status(403).json({ message: "Access denied." });
  try {
    const users = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        user_role: true,
      },
    });
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
/**
 * Creates new user while assigning them role id 1.
 * Body requires: username, password, email
 */
const createUser = async (
  req: express.Request,
  res: express.Response,
  roleLevel: number
) => {
  const role = roleLevel;
  if (req.tokenInfo) {
    const routePath = req.originalUrl;
    if (
      routePath == "/api/user/create/mod" ||
      routePath == "/api/user/create/admin"
    ) {
      // Doesn't allow non-admins to create mods/admins
      if (req.tokenInfo.role_id < 4) {
        return res
          .status(403)
          .json({ message: "Access denied, must be admin." });
      }
    } else {
      // Doesn't allow non-admins/mods to create plus users
      if (req.tokenInfo.role_id < 3) {
        return res
          .status(403)
          .json({ message: "Access denied, must be mod or admin." });
      }
    }
  }
  try {
    const postData = req.body;
    const username = String(postData.username);
    const password = String(postData.password);
    const passwordHash = await bcrypt.hash(password, 5);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: passwordHash,
        email: postData.email,
      },
    });
    // assign level 1 role
    await prisma.user_role.create({
      data: {
        user_id: newUser.id,
        role_id: role,
      },
    });
    res.status(200).json({ status: "OK" });
  } catch (err: any) {
    if (err.code == "P2002") {
      res.status(403).json({ message: "Toks vartotojas jau egzistuoja." });
    } else {
      console.log(err);
      res.status(500).json({ message: "Serverio klaida." });
    }
  }
};
/**
 * Updates user based on id.
 * Body requires: id, username, email, password
 * Only user to whom data belongs or admin/mod can update user.
 */
const updateUser = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  const postData = req.body;
  if (
    req.tokenInfo !== undefined &&
    req.tokenInfo.role_id <= 2 &&
    req.tokenInfo.id != id
  )
    return res.status(403).json({ message: "Access denied." });
  const newPasswordHash = await bcrypt.hash(String(postData.password), 5);
  try {
    const users = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: postData.username,
        password: newPasswordHash,
        email: postData.email,
      },
    });
    res.status(200).json({ status: "OK" });
  } catch (err: any) {
    if (err.code == "P2002") {
      res.status(403).json({ message: "Username or Email already exists." });
    } else {
      console.log(err);
      res.status(500).json({ message: "Serverio klaida." });
    }
  }
};
/**
 * Deletes user based on id
 * Body requires: id
 * Only user to whom account belongs or admin/mod can delete user.
 */
const deleteUser = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  if (
    req.tokenInfo !== undefined &&
    req.tokenInfo.role_id <= 2 &&
    req.tokenInfo.id != id
  )
    return res.status(403).json({ message: "Access denied." });
  try {
    const users = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ status: "OK" });
  } catch (err: any) {
    if (err.code == "P2025") {
      res.status(500).json({ message: "User does not exist." });
    } else {
      console.log(err);
      res.status(500).json({ message: "Serverio klaida." });
    }
  }
};
/**
 * Returns user's id and token if credentials are correct
 * Body requires: username, password
 */
const loginUser = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if username/password doesn't exist
  if (!username || !password) {
    res.status(403).json({ message: "Username or Password absent." });
    return;
  }
  try {
    const user: any = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        user_role: true,
      },
    });
    if (_.isEmpty(user)) {
      res.status(403).json({ message: "User does not exist." });
    } else {
      const correctPassword = await bcrypt.compare(
        String(password),
        user.password
      );
      if (correctPassword) {
        // If login successful, sends id & token containing id & role_id
        let token = jwt.sign(
          { id: user.id, role_id: user.user_role[0].role_id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1d", // Specify how long until token expires.
          }
        );
        res
          .status(200)
          .json({ id: user.id, token: token, role: user.user_role[0].role_id });
      } else {
        res.status(403).json({ message: "Wrong password." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};

const forgot_password = async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(403).json({ message: "User does not exist." });
    } else {
      // Delete expired tokens for the user
      await prisma.password_reset.deleteMany({
        where: {
          user_id: user.id,
          expires: {
            lte: new Date(),
          },
        },
      });

      const existingUserToken = await prisma.password_reset.findFirst({
        where: {
          user_id: user.id,
          expires: {
            gt: new Date(),
          },
        },
      });

      if (existingUserToken) {
        return res.status(403).json({ message: "Password reset email already sent." });
      }

      const token = crypto.randomBytes(64).toString("hex");

      const newUserToken = await prisma.password_reset.create({
        data: {
          user_id: user.id,
          token: token,
          expires: new Date(Date.now() + 300000),
        },
      });

      const mailOptions = {
        from: 'svelniejibiciuliai4@gmail.com',
        to: email,
        subject: 'Slaptažodžio Atnaujinimas',
        html: `</head>
        <body style="background-color: #e9ecef;">
        
        
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" valign="top" style="padding: 36px 24px;">
                      <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
                        <img src="https://i.ibb.co/xhxCntZ/logo.png" alt="Logo" border="0" width="48" style="display: block; width: 10em; max-width: 10em; min-width: 10em;">
                      </a>
                    </td>
                  </tr>
                </table>
        
              </td>
            </tr>
        
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Atstatyti Slaptažodį</h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Bakstelėkite žemiau esantį mygtuką, kad iš naujo nustatytumėte savo paskyros slaptažodį. Jei neprašėte naujo slaptažodžio, galite saugiai ištrinti šį el. laišką.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#4a148c" style="border-radius: 6px;">
                                  <a href="http://localhost:3000/PasswordReset/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Atnaujinti</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Jei tai neveikia, nukopijuokite ir įklijuokite šią nuorodą į savo naršyklę:</p>
                      <p style="margin: 0;"><a href="http://localhost:3000/PasswordReset/${token}" style="color: #4a148c;" target="_blank">https://svelniejibiciuliai.lt/Atnaujinimas</a></p>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                      <p style="margin: 0;">Su pagarba<br> Švelnieji Bičiuliai Komanda</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">Gavote šį el. laišką, nes gavome užklausą dėl jūsų paskyros slaptažodžio keitimo. Jei neprašėte slaptažodžio keitimo, galite saugiai ištrinti šį el. laišką.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>`
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: "Failed to send email." });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ status: "OK", data: newUserToken });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};


const password_recovery = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.params.token;
    const postData = req.body;
    const currentDate = new Date();
    const user = await prisma.password_reset.findFirst({
      where: {
        token: token
      }
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid token." });
    }

    if (user.expires < currentDate) {
      await prisma.password_reset.delete({
        where: {
          user_id_token: {
            token: token,
            user_id: user.user_id
          }
        }
      });
      return res.status(403).json({ message: "Token expired." });
    }

    const password = String(postData.password);
    const passwordHash = await bcrypt.hash(password, 5);

    const passwordUpdate = await prisma.user.update({
      where: {
        id: user.user_id,
      },
      data: {
        password: passwordHash
      }
    });

    const deleteToken = await prisma.password_reset.delete({
      where: {
        user_id_token: {
          token: token,
          user_id: user.user_id
        }
      }
    });

    return res.status(200).json({
      message: "Vartotojo slaptažodis sėkmingai pakeistas!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserPermissions,
  forgot_password,
  password_recovery
};

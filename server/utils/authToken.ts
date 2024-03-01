import express from "express";
const jwt = require("jsonwebtoken");

/**
 * Place inside of routes that require authentication i.e: router.post('/create/admin', authToken, controllerFunction...);
 * If token is expired or invalid, will end HTTP request with 401 status response.
 * If token is valid, will append {id: number, role: number} to req.tokenInfo and continue HTTP request.
 */
export default function authToken(
  req: any,
  res: any,
  next: express.NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, userInfo: any) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.tokenInfo = userInfo;
      next();
    });
  }
}

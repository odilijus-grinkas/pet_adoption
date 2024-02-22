import express from "express"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const PostClient = new PrismaClient().post

async function main() {

    const newUser = await prisma.user.createMany({
        data: [{
            id: 1,
            username: 'johndoe',
            password: 'password123',
            email: 'johndoe@example.com'
        },
        {
            id: 2,
            username: 'plikius',
            password: 'slaptazodis',
            email: 'plikius@example.com'
        }
        ],
        skipDuplicates: true
    });
    const newCity = await prisma.city.createMany({
        data: [
            {
                id: 1,
                city: 'New York'
            },
            {
                id: 2,
                city: 'Vilnius'
            }
        ],
        skipDuplicates: true
    });
    const newRole = await prisma.role.createMany({
        data: [
            {
                id: 1,
                title: 'Admin'
            },
            {
                id: 1,
                title: 'Moderatorius'
            }
        ], skipDuplicates: true
    });

    const newFilter = await prisma.filter.createMany({
        data: [
            {
                id: 1,
                title: 'Filter 1'
            },
            {
                id: 2,
                title: 'Filter 1'
            }
        ],
        skipDuplicates: true
    });

    const newPermission = await prisma.permission.createMany({
        data: [
            {
                id: 1,
                title: 'One',
                description: 'Trinti vartotojus'
            },
            {
                id: 2,
                title: 'Two',
                description: 'Trinti postus'
            }
        ],
        skipDuplicates: true
    });

    const newUserRole = await prisma.user_role.createMany({
        data: [
            {
                user_id: 1,
                role_id: 1
            },
            {
                user_id: 2,
                role_id: 2
            }
        ], skipDuplicates: true
    });

    const newRolePermission = await prisma.role_permission.createMany({
        data: [
            {
                role_id: 1,
                permission_id: 1
            },
            {
                role_id: 2,
                permission_id: 1
            }
        ],
        skipDuplicates: true
    });

    const newPost = await prisma.post.createMany({
        data: [
            {
                id: 1,
                user_id: 1,
                city_id: 1,
                pet_name: 'Buddy',
                description: 'Description of the first post',
                created: new Date(),
                status: 'Active',
                valid: 'Yes'
            },
            {
                id: 2,
                user_id: 2,
                city_id: 1,
                pet_name: 'Max',
                description: 'Description of the second post',
                created: new Date(),
                status: 'Inactive',
                valid: 'No'
            },
            {
                id: 3,
                user_id: 1,
                city_id: 2,
                pet_name: 'Amsis',
                description: 'Description of the third post',
                created: new Date(),
                status: 'Inactive',
                valid: 'No'
            },
            {
                id: 4,
                user_id: 2,
                city_id: 2,
                pet_name: 'Zuika',
                description: 'Description of the fourth post',
                created: new Date(),
                status: 'Inactive',
                valid: 'No'
            }
        ],
        skipDuplicates: true
    });

    const newContact = await prisma.contact.createMany({
        data: [
            {
                id: 1,
                post_id: 1,
                name: 'John Doe',
                info: 'Contact information'
            },
            {
                id: 2,
                post_id: 2,
                name: 'Kitty',
                info: 'Contact number'
            }
        ],
        skipDuplicates: true
    });

    const newPhoto = await prisma.photo.createMany({
        data: [
            {
                id: 1,
                post_id: 1,
                photo: 'photo.jpg'
            },
            {
                id: 2,
                post_id: 2,
                photo: 'photo.jpg'
            }
        ],
        skipDuplicates: true
    });

    const newPostFilter = await prisma.post_filter.createMany({
        data: [
            {
                post_id: 1,
                filter_id: 1
            },
            {
                post_id: 2,
                filter_id: 2
            }
        ],
        skipDuplicates: true
    });


    console.log('Data inserted successfully');
}

main()
    .catch(e => {
        console.error("Error seeding database:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export const getAllPosts = async (req: express.Request, res: express.Response) => {
    try {
        const AllPosts = await PostClient.findMany({
        })
        res.status(200).json({ data: AllPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};

export const getOnePost = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;

        const OnePost = await PostClient.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (OnePost) {
            res.status(200).json({ data: OnePost });
        } else {
            res.status(404).json({ status: "error" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};

export const createPost = async (req: express.Request, res: express.Response) => {
    try {
        let postData = req.body
        const CreatedPost = await PostClient.create({
            data: {
                user_id: postData.user_id,
                city_id: postData.city_id,
                pet_name: postData.pet_name,
                description: postData.description,
                created: new Date(),
                status: postData.status,
                valid: postData.valid
            }
        })
        res.status(200).json({ data: CreatedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};

export const updatePost = async (req: express.Request, res: express.Response) => {
    try {
        const Id = req.params.id
        const newUserID = req.body.user_id
        const newCityID = req.body.city_id
        const newPetName = req.body.pet_name
        const newDescription = req.body.description
        const newStatus = req.body.status
        const newValid = req.body.valid

        const UpdatedPost = await PostClient.update({
            where: {
                id: parseInt(Id)
            },
            data: {
                user_id: newUserID,
                city_id: newCityID,
                pet_name: newPetName,
                description: newDescription,
                status: newStatus,
                valid: newValid
            }
        })
        res.status(200).json({ data: UpdatedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};

export const deletePost = async (req: express.Request, res: express.Response) => {
    try {
        const Id = req.params.id
        const deletedPost = await PostClient.delete({
            where: {
                id: parseInt(Id)
            }
        })
        res.status(200).json({ data: deletedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};
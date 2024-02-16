import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

    const newUser = await prisma.user.create({
        data: {
            username: 'johndoe',
            password: 'password123',
            email: 'johndoe@example.com'
        }
    });
    const newCity = await prisma.city.create({
        data: {
            city: 'New York'
        }
    });
    const newRole = await prisma.role.create({
        data: {
            title: 'Admin'
        }
    });

    const newFilter = await prisma.filter.create({
        data: {
            title: 'Filter 1'
        }
    });

    const newPermission = await prisma.permission.create({
        data: {
            title: 'One',
            description: 'Permission description'
        }
    });

    const newUserRole = await prisma.user_role.create({
        data: {
            user_id: 1,
            role_id: 1
        }
    });

    const newRolePermission = await prisma.role_permission.create({
        data: {
            role_id: 1,
            permission_id: 1
        }
    });

    const newPost = await prisma.post.createMany({
        data: [
            {
                user_id: 1,
                city_id: 1,
                pet_name: 'Buddy',
                description: 'Description of the first post',
                created: new Date(),
                status: 'Active',
                valid: 'Yes'
            },
            {
                user_id: 1,
                city_id: 1,
                pet_name: 'Max',
                description: 'Description of the second post',
                created: new Date(),
                status: 'Inactive',
                valid: 'No'
            },
        ]
    });

    const newContact = await prisma.contact.create({
        data: {
            post_id: 1,
            name: 'John Doe',
            info: 'Contact information'
        }
    });

    const newPhoto = await prisma.photo.create({
        data: {
            post_id: 1,
            photo: 'photo.jpg'
        }
    });

    const newPostFilter = await prisma.post_filter.create({
        data: {
            post_id: 1,
            filter_id: 1
        }
    });


    console.log('Data inserted successfully');
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

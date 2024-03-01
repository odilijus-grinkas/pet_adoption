import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function inconsistentDataSeed() {

    function validDate() {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 2);
        return currentDate.toISOString();
    }

    let ValidDate = validDate();

    const newUser = await prisma.user.createMany({
        data: [{
            id: 1,
            username: 'admin',
            password: '$2a$05$NjunGCGHLSNm1s066dWt6eXbFsF50ly4pYpbCXbCcN68Rgtt.v84u', //admin
            email: 'admin@admin.admin'
        },
        {
            id: 2,
            username: 'mod',
            password: '$2a$05$nMc.47bzZXrye7P5radssOZFcoxYo/3B.Qc56ywYIpY4NjoKPY.TG', //mod
            email: 'mod@mod.mod'
        },
        {
            id: 3,
            username: 'plus',
            password: '$2a$05$iG.Bdhq3zdQy0/Q5/eEUf.0NHG8ztZMA3jn7jyeEivYX3gjOKVogq', //plus
            email: 'plus@plus.plus'
        },
        {
            id: 4,
            username: 'regular',
            password: '$2a$05$feoTdkiabLVZuRNmSd9KsOhqBLEcVTXPik9LArKdrC2/.DiozUpe.', //regular
            email: 'regular@regular.regular'
        },
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
            },
            {
                id: 3,
                city: 'Klaipeda'
            },
            {
                id: 4,
                city: 'Kaunas'
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
                role_id: 4
            },
            {
                user_id: 2,
                role_id: 3
            },
            {
                user_id: 3,
                role_id: 2
            },
            {
                user_id: 4,
                role_id: 1
            },
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
                species_id: 1,
                pet_name: 'Buddy',
                description: 'Description of the first post',
                created: new Date(),
                status: 'Active',
                valid_until: ValidDate
            },
            {
                id: 2,
                user_id: 2,
                city_id: 1,
                species_id: 2,
                pet_name: 'Max',
                description: 'Description of the second post',
                created: new Date(),
                status: 'Inactive',
                valid_until: ValidDate
            },
            {
                id: 3,
                user_id: 1,
                city_id: 2,
                species_id: 1,
                pet_name: 'Amsis',
                description: 'Description of the third post',
                created: new Date(),
                status: 'Inactive',
                valid_until: ValidDate
            },
            {
                id: 4,
                user_id: 2,
                city_id: 2,
                species_id: 2,
                pet_name: 'Megatronas',
                description: 'Description of the fourth post',
                created: new Date(),
                status: 'Inactive',
                valid_until: ValidDate
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

    const newPostOption = await prisma.post_option.createMany({
        data: [
            {
                post_id: 1,
                option_id: 1
            },
            {
                post_id: 2,
                option_id: 2
            }
        ],
        skipDuplicates: true
    });


    console.log('Data inserted successfully');
}

inconsistentDataSeed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

// export default main;
export default inconsistentDataSeed
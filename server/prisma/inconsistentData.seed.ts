import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()
async function inconsistentDataSeed() {

    const existingPostOptions = await prisma.post_option.findMany();
    if (existingPostOptions.length > 0) {
        console.log('post_option table already seeded, skipping...');
        return;
    }

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

    const fakePosts = [];

    for (let i = 0; i < 50; i++) {
        const fakePost = {
            id: i + 1,
            user_id: faker.number.int({ min: 1, max: 3 }),
            city_id: faker.number.int({ min: 1, max: 3 }),
            species_id: faker.number.int({ min: 1, max: 4 }),
            pet_name: faker.animal.type(),
            description: faker.lorem.sentence(),
            created: faker.date.past(),
            status: faker.number.int({ min: 0, max: 1 }),
            valid_until: faker.date.future()
        };

        fakePosts.push(fakePost)
    }

    const newPost = await prisma.post.createMany({
        data: fakePosts,
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

    let fakePostOption = [];
    let optionId = 0;
    for (let i = 0; i < 50; i++) {
        // Ensure fakePosts[i] exists before accessing its properties
        if (fakePosts[i].species_id === 4) {
            optionId = faker.number.int({ min: 1, max: 6 });
        } else {
            optionId = faker.number.int({ min: 1, max: 9 });
        }

        const fakePostOptions = {
            post_id: i + 1,
            option_id: optionId
        };

        fakePostOption.push(fakePostOptions);
    }


    const newPostOption = await prisma.post_option.createMany({
        data: fakePostOption,
        skipDuplicates: true
    });


    console.log('inconsistentData inserted successfully');
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
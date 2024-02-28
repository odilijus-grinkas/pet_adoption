import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const newRole = await prisma.role.createMany({
        data: [
            {
                id: 1,
                title: 'Regular_User'
            },
            {
                id: 2,
                title: 'Regular+'
            },
            {
                id: 3,
                title: 'Moderator'
            },
            {
                id: 4,
                title: 'Admin'
            }
        ], skipDuplicates: true
    });
    const newSpecies = await prisma.species.createMany({
        data: [
            {
                id: 1,
                name: 'Šuo'
            },
            {
                id: 2,
                name: 'Katinas'
            },
        ], skipDuplicates: true
    });

    const newChracteristics = await prisma.characteristic.createMany({
        data: [
            {
                id: 1,
                name: "svoris"
            },
            {
                id: 2,
                name: "spalva"
            }
        ], skipDuplicates: true
    });

    const newOption = await prisma.option.createMany({
        data: [
            {
                id: 1,
                characteristic_id: 1,
                value: "20kg",
            },
            {
                id: 2,
                characteristic_id: 2,
                value: "juoda",
            }
        ], skipDuplicates: true
    });

    const newSpeciesCharacteristic = await prisma.species_characteristic.createMany({
        data: [
            {
                species_id: 1,
                characteristic_id: 1
            }, {
                species_id: 2,
                characteristic_id: 2
            }
        ], skipDuplicates: true
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

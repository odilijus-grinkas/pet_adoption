import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function consistentDataSeed() {
    const newCity = await prisma.city.createMany({
        data: [
            {
                id: 1,
                name: 'Klaipėda'
            },
            {
                id: 2,
                name: 'Jonava'
            },
            {
                id: 3,
                name: 'Vilnius'
            },
            {
                id: 4,
                name: 'Trakai'
            }
        ],
        skipDuplicates: true
    });
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
            {
                id: 3,
                name: 'Triušiai'
            },
            {
                id: 4,
                name: 'Žuvytės'
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
            },
            {
                id: 3,
                name: "kailio ilgis"
            }
        ], skipDuplicates: true
    });

    const newOption = await prisma.option.createMany({
        data: [
            {
                id: 1,
                characteristic_id: 1,
                value: "mažas",
            },
            {
                id: 2,
                characteristic_id: 1,
                value: "vidutinis",
            },
            {
                id: 3,
                characteristic_id: 1,
                value: "didelis",
            },
            {
                id: 4,
                characteristic_id: 2,
                value: "juoda",
            },
            {
                id: 5,
                characteristic_id: 2,
                value: "ruda",
            },
            {
                id: 6,
                characteristic_id: 2,
                value: "balta",
            },
            {
                id: 7,
                characteristic_id: 3,
                value: "trumpas",
            },
            {
                id: 8,
                characteristic_id: 3,
                value: "vidutinis",
            },
            {
                id: 9,
                characteristic_id: 3,
                value: "ilgas",
            }
        ], skipDuplicates: true
    });

    const newSpeciesCharacteristic = await prisma.species_characteristic.createMany({
        data: [
            {
                species_id: 1,
                characteristic_id: 1
            }, {
                species_id: 1,
                characteristic_id: 2
            },
            {
                species_id: 1,
                characteristic_id: 3
            },
            {
                species_id: 2,
                characteristic_id: 1
            },
            {
                species_id: 2,
                characteristic_id: 2
            },
            {
                species_id: 2,
                characteristic_id: 3
            },
            {
                species_id: 3,
                characteristic_id: 2
            },
            {
                species_id: 3,
                characteristic_id: 1
            },
            {
                species_id: 3,
                characteristic_id: 3
            },
            {
                species_id: 4,
                characteristic_id: 1
            },
            {
                species_id: 4,
                characteristic_id: 2
            },
        ], skipDuplicates: true
    })
    console.log("DatabaseData seeded successfully");
}

consistentDataSeed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

export default consistentDataSeed
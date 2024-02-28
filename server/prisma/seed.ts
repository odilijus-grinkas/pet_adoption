import consistentDataSeed from './databaseData.seed';
import inconsistentDataSeed from './inconsistentData.seed';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    try {
        await consistentDataSeed();
        await inconsistentDataSeed();
        console.log("Seeding completed successfully");
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
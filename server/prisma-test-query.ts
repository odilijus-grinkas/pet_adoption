
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.test.create({
//     data: { name: "HELLO" }
//   });
//   const testStuff = await prisma.test.findMany();
//   console.log(testStuff);
// }
// export default function testPrisma() {
//   main().then(async () => { await prisma.$disconnect() }).catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });
// }
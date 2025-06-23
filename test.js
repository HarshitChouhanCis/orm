import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`db.runCommand({ ping: 1 })`;
  console.log("MongoDB connection success:", result);
}

main()
  .catch(e => console.error("Prisma Error:", e))
  .finally(() => prisma.$disconnect());

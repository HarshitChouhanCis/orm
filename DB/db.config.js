import pkg from "../generated/prisma/index.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient({
    log:["query"],
})

export default prisma
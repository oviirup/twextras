import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@/config/env";
import { PrismaClient } from "@/prisma/generated/client";

declare global {
  var __prisma: PrismaClient | undefined;
}
const prismaGlobal = globalThis;

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = prismaGlobal.__prisma || new PrismaClient({ adapter });

if (env.NODE_ENV !== "production") {
  prismaGlobal.__prisma = prisma;
}

export { prisma };

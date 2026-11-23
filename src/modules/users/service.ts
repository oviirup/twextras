import { prisma } from "@/lib/db/prisma";
import type { UserRole, UserStatus } from "@/prisma/generated/enums";

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  username: true,
  role: true,
  status: true,
  image: true,
  createdAt: true,
} as const;

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id }, select: USER_SELECT });
}

export async function getUserWithAccounts(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { ...USER_SELECT, accounts: { select: { providerId: true } } },
  });
}

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: USER_SELECT,
  });
}

export async function updateUser(
  id: string,
  data: { name: string; username: string; email: string; role: UserRole; status: UserStatus },
) {
  return prisma.user.update({ where: { id }, data });
}

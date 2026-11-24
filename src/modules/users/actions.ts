"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole, requireUser } from "@/modules/auth/guards";
import { Prisma } from "@/prisma/generated/client";
import { UserRole, UserStatus } from "@/prisma/generated/enums";
import { deleteUser, getUserById, updateProfile, updateUser } from "./service";
import { getUserRank } from "./utils";

const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  username: z.string().trim().min(1, "Username is required").max(32),
  email: z.email("Enter a valid email").trim(),
  role: z.enum(UserRole),
  status: z.enum(UserStatus),
});

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export async function updateProfileAction(data: unknown) {
  const sessionUser = await requireUser();

  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await updateProfile(sessionUser.id, parsed.data);

  revalidatePath("/dashboard/profile");
  return { success: true };
}

export async function updateUserAction(userId: string, data: unknown) {
  const actor = await requireRole(["super_admin", "admin"]);

  const target = await getUserById(userId);
  if (!target) return { error: "User not found" };

  const parsed = updateUserSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const actorRank = getUserRank(actor.role);
  if (getUserRank(target.role) < actorRank) {
    return { error: "You cannot modify a user with a higher role than yours" };
  }
  if (getUserRank(parsed.data.role) < actorRank) {
    return { error: "You cannot assign a role above your own" };
  }

  const isSelf = target.id === actor.id;

  try {
    await updateUser(userId, {
      ...parsed.data,
      role: isSelf ? target.role : parsed.data.role,
      status: isSelf ? target.status : parsed.data.status,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Username or email is already taken" };
    }
    throw error;
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function deleteUserAction(userId: string) {
  const actor = await requireRole(["super_admin", "admin"]);

  const target = await getUserById(userId);
  if (!target) return { error: "User not found" };
  if (target.role === UserRole.super_admin) {
    return { error: "Super admin accounts cannot be deleted" };
  }
  if (target.id === actor.id) {
    return { error: "You cannot delete your own account" };
  }

  await deleteUser(userId);

  revalidatePath("/dashboard/users");
  return { success: true };
}

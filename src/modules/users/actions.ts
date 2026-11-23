"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/modules/auth/guards";
import { Prisma } from "@/prisma/generated/client";
import { UserRole, UserStatus } from "@/prisma/generated/enums";
import { updateUser } from "./service";

const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  username: z.string().trim().min(1, "Username is required").max(32),
  email: z.email("Enter a valid email").trim(),
  role: z.enum(UserRole),
  status: z.enum(UserStatus),
});

export async function updateUserAction(userId: string, data: unknown) {
  await requireRole(["super_admin", "admin"]);

  const parsed = updateUserSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await updateUser(userId, parsed.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Username or email is already taken" };
    }
    throw error;
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

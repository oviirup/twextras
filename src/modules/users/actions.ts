"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/modules/auth/guards";
import { UserStatus } from "@/prisma/generated/enums";
import { setUserStatus } from "./service";

const ACTIONABLE_STATUSES: UserStatus[] = [UserStatus.active, UserStatus.suspended];

export async function updateUserStatusAction(userId: string, status: UserStatus) {
  await requireRole(["super_admin", "admin"]);
  if (!ACTIONABLE_STATUSES.includes(status)) {
    throw new Error("Invalid status");
  }
  await setUserStatus(userId, status);
  revalidatePath("/dashboard/users");
}

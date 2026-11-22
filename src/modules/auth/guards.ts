import { forbidden, redirect } from "next/navigation";
import { getUserById } from "@/modules/users/service";
import { UserRole } from "@/prisma/generated/enums";
import { getSession } from "./session";
import { hasAnyRole, isActiveUser } from "./utils";

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) redirect("/dashboard/signin");
  return session.user;
}

export async function requireUserProfile() {
  const sessionUser = await requireUser();
  const user = await getUserById(sessionUser.id);
  if (!user) redirect("/dashboard/signin");
  return user;
}

export async function requireActiveUser() {
  const user = await requireUserProfile();
  if (!isActiveUser(user)) forbidden();
  return user;
}

export async function requireRole(roles: UserRole[]) {
  const user = await requireActiveUser();
  if (!hasAnyRole(user, roles)) forbidden();
  return user;
}

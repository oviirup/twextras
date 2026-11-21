import { redirect } from "next/navigation";
import { getSession } from "./session";

type SessionUser = { status?: string | null; role?: string | null };

export function isActiveUser(user: SessionUser | null | undefined): boolean {
  return user?.status === "active";
}

export function hasAnyRole(user: SessionUser | null | undefined, roles: string[]): boolean {
  return !!user?.role && roles.includes(user.role);
}

export async function requireActiveUser() {
  const session = await getSession();
  if (!session?.user || !isActiveUser(session.user)) redirect("/");
  return session.user;
}

export async function requireRole(roles: string[]) {
  const user = await requireActiveUser();
  if (!hasAnyRole(user, roles)) redirect("/");
  return user;
}

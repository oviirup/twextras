import { UserRole, UserStatus } from "@/prisma/generated/enums";

type SessionUser = {
  id?: string;
  status?: UserStatus | null;
  role?: UserRole | null;
};

export function isActiveUser(user: SessionUser | null | undefined): boolean {
  return !!user && user.status === UserStatus.active;
}

export function hasAnyRole(user: SessionUser | null | undefined, roles: UserRole[]): boolean {
  return !!user?.role && roles.includes(user.role);
}

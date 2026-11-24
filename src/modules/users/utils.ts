import { UserRole } from "@/prisma/generated/enums";

export const ROLE_RANK: Map<UserRole, number> = new Map([
  ["super_admin", 0],
  ["admin", 1],
  ["manager", 2],
  ["employee", 3],
]);

export function getUserRank(role: UserRole) {
  return ROLE_RANK.get(role) ?? -1;
}

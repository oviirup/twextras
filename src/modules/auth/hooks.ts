import { APIError, createAuthMiddleware } from "better-auth/api";
import { SUPER_ADMIN_EMAILS } from "@/config/app";
import { prisma } from "@/lib/db/prisma";
import { UserRole, UserStatus } from "@/prisma/generated/enums";

const SIGN_IN_PATHS = ["/sign-in/email", "/sign-in/username"];

export const blockInactiveSignIn = createAuthMiddleware(async (ctx) => {
  if (!SIGN_IN_PATHS.includes(ctx.path)) return;

  const body = ctx.body as { email?: string; username?: string } | undefined;
  const identifier = body?.email ?? body?.username;
  if (!identifier) return;

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier }, { username: identifier }] },
    select: { id: true, email: true, role: true, status: true },
  });
  if (!user) return;

  if (
    SUPER_ADMIN_EMAILS.includes(user.email) &&
    (user.role !== UserRole.super_admin || user.status !== UserStatus.active)
  ) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: UserRole.super_admin, status: UserStatus.active },
    });
    user.role = UserRole.super_admin;
    user.status = UserStatus.active;
  }

  if (user.status === UserStatus.terminated) {
    throw new APIError("FORBIDDEN", {
      message: "Your account has been deactivated. Contact an administrator.",
    });
  }
});

import { APIError, createAuthMiddleware } from "better-auth/api";
import { prisma } from "@/lib/db/prisma";
import { UserStatus } from "@/prisma/generated/enums";

const BLOCKED_STATUSES: UserStatus[] = [UserStatus.suspended, UserStatus.terminated];

export const blockInactiveSignIn = createAuthMiddleware(async (ctx) => {
  if (ctx.path !== "/sign-in/email") return;

  const email = (ctx.body as { email?: string } | undefined)?.email;
  if (!email) return;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { status: true },
  });

  if (user && BLOCKED_STATUSES.includes(user.status)) {
    throw new APIError("FORBIDDEN", {
      message: "Your account has been deactivated. Contact an administrator.",
    });
  }
});

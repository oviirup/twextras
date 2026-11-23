import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins/username";
import { SITE, SUPER_ADMIN_EMAILS } from "@/config/app";
import { env, isProd } from "@/config/env";
import { prisma } from "@/lib/db/prisma";
import { blockInactiveSignIn } from "@/modules/auth/hooks";
import { UserRole, UserStatus } from "@/prisma/generated/enums";

export const auth = betterAuth({
  appName: "Omkarnath Mission",
  // base configuration
  baseURL: SITE.URL,
  secret: env.BETTER_AUTH_SECRET,
  // database
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      trustedProviders: ["google"],
      requireLocalEmailVerified: false, // TODO: Implement email verification flow
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      disableSignUp: true,
      display: "popup", // or "redirect", to be determined
    },
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, input: false },
      status: { type: "string", required: false, input: false },
    },
  },
  hooks: {
    before: blockInactiveSignIn,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // auto-assign super_admin role to predefined emails
          if (!user.email || !SUPER_ADMIN_EMAILS.includes(user.email)) return;
          return {
            data: { ...user, role: UserRole.super_admin, status: UserStatus.active },
          };
        },
      },
    },
  },
  plugins: [
    username({
      minUsernameLength: 6,
      maxUsernameLength: 32,
      displayUsername: false,
    }),
  ],
  session: {
    expiresIn: 3600 * 24 * 7, // 7 days
    updateAge: 3600 * 24, // 1 day
  },
  trustedOrigins: [new URL(SITE.URL).origin],
  advanced: {
    useSecureCookies: isProd,
  },
});

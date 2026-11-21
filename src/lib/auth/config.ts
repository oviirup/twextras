import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins/username";
import { SITE } from "@/config/app";
import { env, isProd } from "@/config/env";
import { prisma } from "@/lib/db/prisma";

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

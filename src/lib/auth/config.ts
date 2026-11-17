import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
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
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    expiresIn: 3600 * 24 * 7, // 7 days
    updateAge: 3600 * 24, // 1 day
  },
  trustedOrigins: ["http://localhost:3000"],
  advanced: {
    useSecureCookies: isProd,
  },
});

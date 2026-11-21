import { createEnv } from "@oviirup/env/next";
import { vercel } from "@oviirup/env/presets";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.string(),
  },
  server: {
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },
  vars: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ?? "3000",
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  skip: !process.env.NEXT_RUNTIME,
});

export const isProd = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";
export const isPreview = env.VERCEL_ENV === "preview";

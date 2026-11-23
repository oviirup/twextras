"use client";

import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { SITE } from "@/config/app";

const client = createAuthClient({
  baseURL: SITE.URL,
  plugins: [adminClient(), usernameClient()],
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
  updateUser,
  deleteUser,
  linkSocial,
  listAccounts,
} = client;

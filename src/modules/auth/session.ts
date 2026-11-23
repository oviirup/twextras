import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";

export async function getSession() {
  const nextHeaders = await headers();
  return auth.api.getSession({ headers: nextHeaders });
}

export async function getUserSessions() {
  const nextHeaders = await headers();
  return auth.api.listSessions({ headers: nextHeaders });
}

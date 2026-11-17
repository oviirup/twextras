import { headers } from "next/headers";
import { auth } from "./config";

export async function getSession() {
  const nextHeaders = await headers();
  return auth.api.getSession({ headers: nextHeaders });
}

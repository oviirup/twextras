"use client";

import { toPascalCase } from "@oviirup/utils/string";
import { createBaseContext } from "@/lib/context";
import type { UserRow } from "./table";

const name = toPascalCase("user-row");

export const [UserRowContext, useUserRow] = createBaseContext<UserRow>({
  name: `${name}Context`,
  error: `use${name} must be used within the ${name}Context provider`,
});

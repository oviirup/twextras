"use client";

import { toPascalCase } from "@oviirup/utils/string";
import { createBaseContext } from "@/lib/context";
import type { EventRow } from "./table";

const name = toPascalCase("event-row");

export const [EventRowContext, useEventRow] = createBaseContext<EventRow>({
  name: `${name}Context`,
  error: `use${name} must be used within the ${name}Context provider`,
});

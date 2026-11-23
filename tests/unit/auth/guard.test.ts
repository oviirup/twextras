import { describe, expect, test } from "bun:test";
import { hasAnyRole, isUserActive } from "@/modules/auth/utils";

describe("isActiveUser", () => {
  test("only active status passes", () => {
    expect(isUserActive({ status: "active" })).toBe(true);
    expect(isUserActive({ status: "pending" })).toBe(false);
    expect(isUserActive({ status: "terminated" })).toBe(false);
    expect(isUserActive(null)).toBe(false);
    expect(isUserActive(undefined)).toBe(false);
  });
});

describe("hasAnyRole", () => {
  test("matches listed roles only", () => {
    expect(hasAnyRole({ role: "admin" }, ["admin", "super_admin"])).toBe(true);
    expect(hasAnyRole({ role: "employee" }, ["admin", "super_admin"])).toBe(false);
    expect(hasAnyRole({ role: null }, ["admin"])).toBe(false);
    expect(hasAnyRole(null, ["admin"])).toBe(false);
  });
});

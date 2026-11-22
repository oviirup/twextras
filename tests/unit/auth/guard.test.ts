import { describe, expect, test } from "bun:test";
import { hasAnyRole, isActiveUser } from "@/modules/auth/utils";

describe("isActiveUser", () => {
  test("only active status passes", () => {
    expect(isActiveUser({ status: "active" })).toBe(true);
    expect(isActiveUser({ status: "pending" })).toBe(false);
    expect(isActiveUser({ status: "terminated" })).toBe(false);
    expect(isActiveUser(null)).toBe(false);
    expect(isActiveUser(undefined)).toBe(false);
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

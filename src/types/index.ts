export type Pretty<T> = { [K in keyof T]: T[K] } & {};
export type Dictionary<T = any> = Record<PropertyKey, T>;
export type Func<T = any> = (...args: any[]) => T;
export type Awaitable<T> = T | Promise<T>;
export type Callback<T = void> = () => T;

export type PackageManager = "pnpm" | "yarn" | "npm" | "bun";

export type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
export type Falsy<T> = T extends false | "" | 0 | null | undefined ? T : never;

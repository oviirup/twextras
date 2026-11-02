import plugin from "tailwindcss/plugin";

const arbitraryValueBucket = new Proxy({} as Record<string, string>, {
  get: (_, key) => (typeof key === "string" ? key : undefined),
  getOwnPropertyDescriptor: (_, key) =>
    typeof key === "string"
      ? { configurable: true, enumerable: true, value: key, writable: false }
      : undefined,
});

export default plugin(({ matchVariant }) => {
  // `slot-*` targets the element itself; compose with `*:` or `**:` for children
  matchVariant("slot", (value) => `&[data-slot="${String(value)}"]`, {
    values: arbitraryValueBucket,
  });
});

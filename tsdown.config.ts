import path from "node:path";
import { defineConfig } from "tsdown";

const PKG_EXPORT = "./package.json";
const CWD = process.cwd();

function slash(pathname: string) {
  const slashed = pathname.replace(/\\/g, "/");
  if (slashed === ".") return slashed;
  if (slashed.startsWith("./")) return slashed;
  return `./${slashed}`;
}

function cssExportKey(fileName: string) {
  const dir = path.dirname(fileName);
  const name = fileName.replace(/\.css$/, "");
  if (name === "index") return slash(dir);
  return slash(name);
}

export default defineConfig({
  entry: ["./src/**/*.*"],
  minify: true,
  css: {
    splitting: true,
    minify: true,
  },
  exports: {
    packageJson: true,
    customExports: (exports, ctx) => {
      const chunks = ctx.chunks.es ?? ctx.chunks.cjs ?? [];
      for (const c of chunks) {
        const filename = c.fileName;
        if (path.extname(filename) === ".css") {
          const rel = path.relative(CWD, path.join(c.outDir, filename));
          exports[cssExportKey(filename)] = slash(rel);
        }
      }
      return Object.fromEntries(
        Object.entries(exports).sort(([a], [b]) => {
          if (a === PKG_EXPORT) return 1;
          if (b === PKG_EXPORT) return -1;
          return a.localeCompare(b);
        }),
      );
    },
  },
});

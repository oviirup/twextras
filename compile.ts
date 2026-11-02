import fs from "node:fs";
import path from "node:path";
import { transform } from "lightningcss";
import { build, InlineConfig } from "tsdown";

const cwd = process.cwd();
const srcDir = path.join(cwd, "src");
const outDir = path.join(cwd, "dist");

// clean dist ----->

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true });
}

// build js files ----->

const baseTsdownOptions: InlineConfig = {
  cwd,
  clean: false,
  deps: { neverBundle: true },
  fixedExtension: false,
  minify: true,
};

await build({
  entry: ["./src/*.{js,ts}", "!./src/**/*.plugin.*"],
  dts: true,
  ...baseTsdownOptions,
});
await build({
  entry: ["./src/**/*.plugin.{js,ts}"],
  dts: false,
  ...baseTsdownOptions,
});

// build css files ----->

const cssFiles = fs.globSync("**/*.css", { cwd: srcDir });
for (const rel of cssFiles) {
  const input = path.resolve(srcDir, rel);
  const output = path.resolve(outDir, rel);
  try {
    const css = fs.readFileSync(input);
    const { code } = transform({
      filename: input,
      code: css,
      minify: true,
    });
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, code);
  } catch {}
}
console.log("✔ Building css files complete.");

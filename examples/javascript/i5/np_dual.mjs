import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { withTempDir } from "./fp_helper.mjs";
import { writeTree } from "./np_helper.mjs";

const files = {
  "node_modules/dual/package.json": JSON.stringify({
    name: "dual",
    version: "1.0.0",
    exports: { ".": { import: "./esm.mjs", require: "./cjs.cjs" } },
  }),
  "node_modules/dual/esm.mjs": 'export default "esm build";\n',
  "node_modules/dual/cjs.cjs": 'module.exports = "cjs build";\n',
  "app.mjs": `
    import { createRequire } from "node:module";
    import dual from "dual";
    console.log(dual, "|", createRequire(import.meta.url)("dual"));
  `,
};

await withTempDir(async (dir) => {
  await writeTree(dir, files);
  await import(pathToFileURL(join(dir, "app.mjs")).href);
});

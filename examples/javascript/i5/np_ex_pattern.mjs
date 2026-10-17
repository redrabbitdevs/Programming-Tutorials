import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { withTempDir } from "./fp_helper.mjs";
import { writeTree } from "./np_helper.mjs";

const files = {
  "node_modules/mathy/package.json": JSON.stringify({
    name: "mathy",
    version: "1.0.0",
    type: "module",
    exports: { "./*": "./lib/*.js" },
  }),
  "node_modules/mathy/lib/add.js": "export default (a, b) => a + b;\n",
  "node_modules/mathy/lib/mul.js": "export default (a, b) => a * b;\n",
  "app.mjs": `
    import add from "mathy/add";
    import mul from "mathy/mul";
    console.log(add(2, 3), mul(2, 3));
    await import("mathy/missing").catch((e) => console.log(e.code));
  `,
};

await withTempDir(async (dir) => {
  await writeTree(dir, files);
  await import(pathToFileURL(join(dir, "app.mjs")).href);
});

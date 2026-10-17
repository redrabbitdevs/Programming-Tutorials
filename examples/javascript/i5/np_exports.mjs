import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { withTempDir } from "./fp_helper.mjs";
import { writeTree } from "./np_helper.mjs";

const json = (value) => JSON.stringify(value);

const files = {
  "node_modules/greeter/package.json": json({
    name: "greeter",
    version: "2.1.0",
    type: "module",
    exports: { ".": "./src/main.js", "./extra": "./src/extra.js" },
  }),
  "node_modules/greeter/src/main.js":
    'export const greet = (n) => "Hello, " + n + "!";\n',
  "node_modules/greeter/src/extra.js":
    "export const shout = (t) => t.toUpperCase();\n",
  "node_modules/greeter/src/internal.js": "export const secret = 42;\n",

  "package.json": json({
    name: "app",
    type: "module",
    imports: { "#lib/*": "./lib/*.js" },
  }),
  "lib/util.js": "export const twice = (n) => n * 2;\n",
  "app.mjs": `
    import { greet } from "greeter";
    import { shout } from "greeter/extra";
    import { twice } from "#lib/util";
    console.log(greet("Ada"), shout("hi"), twice(21));
    await import("greeter/src/internal.js").catch((e) => console.log(e.code));
  `,
};

await withTempDir(async (dir) => {
  await writeTree(dir, files);
  await import(pathToFileURL(join(dir, "app.mjs")).href);
});

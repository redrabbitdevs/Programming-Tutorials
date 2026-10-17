import { createRequire } from "node:module";
import { greet } from "np-demo";
import { shout } from "np-demo/extra";
import dual from "np-demo/dual";
import { twice } from "#lib/util";

console.log(greet("Ada"), shout("hi"), twice(21));
console.log(dual, "|", createRequire(import.meta.url)("np-demo/dual"));
await import("np-demo/src/internal.js").catch((e) => console.log(e.code));

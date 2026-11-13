import { createRequire } from "node:module";
import { Token } from "@example/dual";

const require = createRequire(import.meta.url);
const { Token: RequiredToken } = require("@example/dual");

console.log(Token === RequiredToken);
console.log(new Token() instanceof RequiredToken);

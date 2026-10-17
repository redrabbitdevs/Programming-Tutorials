import { isBuiltin } from "node:module";

console.log(isBuiltin("node:fs"), isBuiltin("fs"));
console.log(isBuiltin("express"));
console.log(isBuiltin("node:test"), isBuiltin("test"));

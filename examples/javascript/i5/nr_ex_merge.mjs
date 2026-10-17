import { parseEnv } from "node:util";

const fromFile = parseEnv("MODE=dev\nPORT=3000\nCOLOR=blue\n");
const real = { PORT: "9000" };
const merged = { ...fromFile, ...real };
console.log(merged.MODE, merged.PORT, merged.COLOR);

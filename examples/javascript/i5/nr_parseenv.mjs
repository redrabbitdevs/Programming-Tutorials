import { parseEnv } from "node:util";

const text = 'A=1\n# note\nB="two words"\nexport C=3\n';
const parsed = parseEnv(text);
console.log(Object.entries(parsed));

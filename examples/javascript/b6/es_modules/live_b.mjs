import { n, bump } from "./live_a.mjs";

bump();
bump();
console.log(n);

try {
  n++;
} catch (error) {
  console.log(error.name);
}

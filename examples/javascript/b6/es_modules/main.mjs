import greet, { defaultName } from "./greeter.mjs";
import { add, TAX_RATE as rate } from "./math.mjs";
import * as math from "./math.mjs";
import { count, increment } from "./counter.mjs";
import { add as addAgain, greet as hello } from "./index.mjs";
import "./loaded_once.mjs";
import { message } from "./other_user.mjs";

console.log(greet(), greet("Ada"), defaultName);
console.log(add(2, 3), rate);
console.log(math.withTax(100));
console.log(math);
console.log(addAgain === add, hello === greet);

console.log(count);
increment();
increment();
console.log(count);

try {
  count = 10;
} catch (error) {
  console.log(error.name);
}

console.log(message);

const notGlobal = 1;
console.log(globalThis.notGlobal, typeof this, typeof require);

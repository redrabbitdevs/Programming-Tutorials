import { fib } from "./fib.wasm";

console.log("fib(10) =", fib(10));
console.log("fib(90) =", fib(90));
console.log("type:", typeof fib(10));
console.log("Number(fib(90)) exact?", Number.isSafeInteger(Number(fib(90))));

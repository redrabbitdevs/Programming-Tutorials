process.env.RETRIES = 3;
console.log(typeof process.env.RETRIES, process.env.RETRIES + 1);
console.log(Number(process.env.RETRIES) + 1);

console.log(process.env.TUTORIAL_NOT_SET);
console.log(process.env.TUTORIAL_NOT_SET ?? "default value");

delete process.env.RETRIES;
console.log("RETRIES" in process.env);

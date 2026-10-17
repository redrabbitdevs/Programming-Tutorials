const how = process.argv[2];

if (how === "code") process.exitCode = 5;
if (how === "exit") process.exit(4);
if (how === "throw") throw new Error("boom");
if (how === "reject") Promise.reject(new Error("late"));
console.log("reached the end");

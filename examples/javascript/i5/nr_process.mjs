console.log(process.argv.length, process.argv.slice(2));

const major = Number(process.versions.node.split(".")[0]);
console.log("Node 22 or newer:", major >= 22);

process.on("exit", (code) => console.log("exit event, code", code));
console.log("last line of the script");

const major = Number(process.versions.node.split(".")[0]);

console.log(major >= 26 ? "Node 26 or newer" : "older than Node 26");

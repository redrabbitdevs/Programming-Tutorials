const major = Number(process.versions.node.split(".")[0]);

console.log(`Node major version: ${major >= 22 ? "22 or newer" : "too old for this course"}`);

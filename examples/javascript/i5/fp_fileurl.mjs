import { fileURLToPath, pathToFileURL } from "node:url";

const url = pathToFileURL("/tmp/my notes/a.txt");
console.log(url.href);
console.log(fileURLToPath(url));
console.log(fileURLToPath("file:///tmp/x%23y.txt"));

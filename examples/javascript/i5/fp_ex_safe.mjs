import { resolve, relative, isAbsolute } from "node:path";

function safeJoin(root, userPath) {
  const target = resolve(root, userPath);
  const route = relative(root, target);
  if (route.startsWith("..") || isAbsolute(route)) {
    throw new Error("outside root");
  }
  return target;
}

for (const input of ["docs/a.txt", "./b.txt", "../secret.txt"]) {
  try {
    console.log(safeJoin("/srv/public", input));
  } catch (error) {
    console.log(error.message);
  }
}

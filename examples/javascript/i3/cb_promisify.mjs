import { promisify } from "node:util";
import { readFile } from "node:fs";
import { getUser } from "./cb_helpers.mjs";

const readFileAsync = promisify(readFile);
const getUserAsync = promisify(getUser);

const notes = new URL("./notes.txt", import.meta.url);
const text = await readFileAsync(notes, "utf8");
console.log(text.split("\n")[0]);
console.log(await getUserAsync(7));

try {
  await readFileAsync(new URL("./missing.txt", import.meta.url));
} catch (error) {
  console.log("rejected with", error.code);
}

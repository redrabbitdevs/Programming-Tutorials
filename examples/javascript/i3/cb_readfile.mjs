import { readFile } from "node:fs";

const notes = new URL("./notes.txt", import.meta.url);
const missing = new URL("./missing.txt", import.meta.url);

readFile(notes, "utf8", (error, text) => {
  if (error) {
    console.log("could not read:", error.code);
    return;
  }
  console.log("notes has", text.split("\n").length - 1, "lines");
  readFile(missing, "utf8", (error) => {
    console.log("second read:", error.code);
  });
});

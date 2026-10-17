import { session } from "./session.mjs";

session(import.meta.dirname, [
  "chmod +x ct_grep.mjs",
  "./ct_grep.mjs -n apple fruit.txt",
]);

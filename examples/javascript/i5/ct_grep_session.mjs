import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node ct_grep.mjs apple fruit.txt",
  "node ct_grep.mjs -in BANANA fruit.txt",
  "node ct_grep.mjs '^a' fruit.txt more.txt",
  "node ct_grep.mjs 'e$' fruit.txt more.txt",
  "node ct_grep.mjs zzz fruit.txt; echo $?",
  "node ct_grep.mjs apple missing.txt; echo $?",
  "node ct_grep.mjs '(' fruit.txt; echo $?",
  "node ct_grep.mjs apple; echo $?",
]);

import { grade } from "./grade.ts";
import type { Question } from "./types.ts";

const pick: Question = {
  kind: "choice",
  prompt: "Pick the second one",
  choices: ["a", "b", "c"],
  answer: 1,
};
const word: Question = { kind: "text", prompt: "Say hi", answer: "hi" };

console.log(grade(pick, "2"), grade(pick, "3"), grade(pick, "4"));
console.log(grade(pick, "abc"), grade(pick, ""), grade(pick, "1.5"));
console.log(grade(word, " HI "), grade(word, "hello"), grade(word, "  "));

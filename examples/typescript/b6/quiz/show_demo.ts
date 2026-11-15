import { answerText, hint, lines } from "./show.ts";
import { summarise, verdict } from "./score.ts";
import type { Question } from "./types.ts";

const pick: Question = {
  kind: "choice",
  prompt: "Pick the second one",
  choices: ["a", "b", "c"],
  answer: 1,
};
const word: Question = { kind: "text", prompt: "Say hi", answer: "hi" };

console.log(lines(pick, 1).join("\n"));
console.log(lines(word, 2).join("\n"));
console.log(hint(pick), hint(word));
console.log(answerText(pick), answerText(word));
console.log(summarise([true, false, true, true]), summarise([]));
console.log(verdict(100), verdict(50), verdict(0));

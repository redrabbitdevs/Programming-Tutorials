import { loadQuestions, validate } from "./load.ts";

const questions = loadQuestions();
console.log(`${questions.length} questions loaded`);
console.log(questions.map((q) => q.kind).join(" "));

const bad: unknown[] = [
  [{ kind: "choice", prompt: "?", choices: ["only one"], answer: 0 }],
  [{ kind: "text", prompt: "?", answer: 42 }],
  [{ kind: "choice", prompt: "?", choices: ["a", "b"], answer: 5 }],
];
for (const data of bad) {
  try {
    validate(data);
  } catch (error) {
    console.log(error instanceof Error ? error.message : String(error));
  }
}

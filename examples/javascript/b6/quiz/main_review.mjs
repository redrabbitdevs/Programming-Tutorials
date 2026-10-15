import { createInterface } from "node:readline/promises";
import { loadQuestions } from "./load.mjs";
import { askQuestion } from "./ask.mjs";
import { isCorrect, summarise } from "./score.mjs";

const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();

const questions = loadQuestions();
const results = [];
const missed = [];

for (const [i, question] of questions.entries()) {
  const picked = await askQuestion(lines, question, i + 1);
  if (picked === null) break;
  const right = isCorrect(question, picked);
  results.push(right);
  if (!right) missed.push(question);
}
rl.close();

const { correct, total } = summarise(results);
console.log(`\nScore: ${correct}/${total}`);

if (missed.length > 0) {
  console.log("Review these:");
  for (const q of missed) {
    console.log(`- ${q.prompt} -> ${q.choices[q.answer]}`);
  }
}

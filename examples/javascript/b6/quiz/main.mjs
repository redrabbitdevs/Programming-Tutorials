import { createInterface } from "node:readline/promises";
import { loadQuestions } from "./load.mjs";
import { askQuestion } from "./ask.mjs";
import { isCorrect, summarise, verdict } from "./score.mjs";

const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();

try {
  const questions = loadQuestions();
  const results = [];
  console.log(`JavaScript quiz: ${questions.length} questions`);

  for (const [i, question] of questions.entries()) {
    const picked = await askQuestion(lines, question, i + 1);
    if (picked === null) {
      console.log("\nInput ended early.");
      break;
    }
    const right = isCorrect(question, picked);
    console.log(
      right ? "Correct!" : `Not quite. The answer is ${question.choices[question.answer]}.`,
    );
    results.push(right);
  }

  const { correct, total, percent } = summarise(results);
  console.log(`\nScore: ${correct}/${total} (${percent}%)`);
  console.log(verdict(percent));
} catch (error) {
  console.error(`Quiz failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  rl.close();
}

import { createInterface } from "node:readline";
import { grade } from "./grade.ts";
import { loadQuestions } from "./load.ts";
import { summarise, verdict } from "./score.ts";
import { answerText, hint, lines } from "./show.ts";
import type { Question } from "./types.ts";

function show(question: Question, number: number): void {
  console.log(`\n${lines(question, number).join("\n")}`);
  process.stdout.write("Your answer: ");
}

function runQuiz(questions: Question[]): void {
  const rl = createInterface({ input: process.stdin });
  const results: boolean[] = [];

  console.log(`TypeScript quiz: ${questions.length} questions`);
  show(questions[0], 1);

  rl.on("line", (text) => {
    if (results.length === questions.length) return;

    const question = questions[results.length];
    const outcome = grade(question, text);
    if (outcome === "invalid") {
      console.log(hint(question));
      process.stdout.write("Your answer: ");
      return;
    }

    const right = outcome === "correct";
    const miss = `Not quite. It is ${answerText(question)}.`;
    console.log(right ? "Correct!" : miss);
    results.push(right);

    if (results.length === questions.length) {
      rl.close();
    } else {
      show(questions[results.length], results.length + 1);
    }
  });

  rl.on("close", () => {
    if (results.length < questions.length) console.log("\nInput ended early.");
    const { correct, total, percent } = summarise(results);
    console.log(`\nScore: ${correct}/${total} (${percent}%)`);
    console.log(verdict(percent));
  });
}

try {
  runQuiz(loadQuestions());
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Quiz failed: ${reason}`);
  process.exitCode = 1;
}

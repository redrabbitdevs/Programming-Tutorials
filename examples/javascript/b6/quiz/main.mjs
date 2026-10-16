import { createInterface } from "node:readline";
import { loadQuestions } from "./load.mjs";
import { parseChoice, showPrompt, showQuestion } from "./ask.mjs";
import { isCorrect, summarise, verdict } from "./score.mjs";

function runQuiz(questions) {
  const rl = createInterface({ input: process.stdin });
  const results = [];

  console.log(`JavaScript quiz: ${questions.length} questions`);
  showQuestion(questions[0], 1);

  rl.on("line", (text) => {
    if (results.length === questions.length) return;

    const question = questions[results.length];
    const picked = parseChoice(text, question.choices.length);
    if (picked === null) {
      console.log(`Please type a number from 1 to ${question.choices.length}.`);
      showPrompt();
      return;
    }

    const right = isCorrect(question, picked);
    const answer = question.choices[question.answer];
    console.log(right ? "Correct!" : `Not quite. The answer is ${answer}.`);
    results.push(right);

    if (results.length === questions.length) {
      rl.close();
    } else {
      showQuestion(questions[results.length], results.length + 1);
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
  console.error(`Quiz failed: ${error.message}`);
  process.exitCode = 1;
}

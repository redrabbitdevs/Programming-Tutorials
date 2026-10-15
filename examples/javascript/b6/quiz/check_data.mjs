import { loadQuestions, validate } from "./load.mjs";

const questions = loadQuestions();
console.log(`${questions.length} questions loaded`);
console.log(questions[0].prompt);

try {
  validate([{ prompt: "?", choices: ["only one"], answer: 0 }]);
} catch (error) {
  console.log(error.message);
}

import type { Question } from "./types.ts";

export function lines(question: Question, number: number): string[] {
  const head = `Question ${number}: ${question.prompt}`;
  if (question.kind === "text") {
    return [head];
  }
  const options = question.choices.map((c, i) => `  ${i + 1}) ${c}`);
  return [head, ...options];
}

export function hint(question: Question): string {
  if (question.kind === "choice") {
    return `Please type a number from 1 to ${question.choices.length}.`;
  }
  return "Please type an answer.";
}

export function answerText(question: Question): string {
  return question.kind === "choice"
    ? question.choices[question.answer]
    : question.answer;
}

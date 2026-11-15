import raw from "./questions.json" with { type: "json" };
import type { Question } from "./types.ts";

function readChoices(value: unknown, where: string): string[] {
  if (!Array.isArray(value) || value.length < 2) {
    throw new Error(`${where}: needs at least two choices`);
  }
  const choices: string[] = [];
  for (const choice of value) {
    if (typeof choice !== "string") {
      throw new Error(`${where}: every choice must be text`);
    }
    choices.push(choice);
  }
  return choices;
}

function parseQuestion(item: unknown, where: string): Question {
  if (typeof item !== "object" || item === null) {
    throw new Error(`${where}: must be an object`);
  }
  if (!("prompt" in item) || typeof item.prompt !== "string") {
    throw new Error(`${where}: prompt must be text`);
  }
  if (!("kind" in item) || !("answer" in item)) {
    throw new Error(`${where}: needs a kind and an answer`);
  }
  const prompt = item.prompt;
  if (item.kind === "text" && typeof item.answer === "string") {
    return { kind: "text", prompt, answer: item.answer };
  }
  if (item.kind === "choice" && "choices" in item) {
    const choices = readChoices(item.choices, where);
    const answer = item.answer;
    if (typeof answer === "number" && Number.isInteger(answer)) {
      if (answer >= 0 && answer < choices.length) {
        return { kind: "choice", prompt, choices, answer };
      }
    }
    throw new Error(`${where}: answer is not one of the choices`);
  }
  throw new Error(`${where}: unknown kind or wrong answer type`);
}

export function validate(data: unknown): Question[] {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("The quiz needs at least one question");
  }
  return data.map((item, i) => parseQuestion(item, `question ${i + 1}`));
}

export function loadQuestions(): Question[] {
  return validate(raw);
}

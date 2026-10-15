import questions from "./questions.json" with { type: "json" };

export function validate(list) {
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error("The quiz needs at least one question");
  }
  list.forEach((q, i) => {
    const where = `question ${i + 1}`;
    if (typeof q.prompt !== "string") {
      throw new Error(`${where}: prompt must be text`);
    }
    if (!Array.isArray(q.choices) || q.choices.length < 2) {
      throw new Error(`${where}: needs at least two choices`);
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.choices.length) {
      throw new Error(`${where}: answer is not one of the choices`);
    }
  });
  return list;
}

export function loadQuestions() {
  return validate(questions);
}

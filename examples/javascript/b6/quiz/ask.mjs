export function parseChoice(text, count) {
  const trimmed = text.trim();
  const number = Number(trimmed);
  if (trimmed === "" || !Number.isInteger(number)) return null;
  if (number < 1 || number > count) return null;
  return number - 1;
}

export function showPrompt() {
  process.stdout.write("Your answer: ");
}

export function showQuestion(question, number) {
  console.log(`\nQuestion ${number}: ${question.prompt}`);
  question.choices.forEach((choice, i) => console.log(`  ${i + 1}) ${choice}`));
  showPrompt();
}

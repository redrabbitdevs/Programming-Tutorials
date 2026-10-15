export function validateAge(text) {
  const trimmed = text.trim();
  if (trimmed === "") return "Enter your age.";
  const age = Number(trimmed);
  if (!Number.isInteger(age)) return "Use whole numbers only.";
  if (age < 13 || age > 120) return "Age must be between 13 and 120.";
  return "";
}

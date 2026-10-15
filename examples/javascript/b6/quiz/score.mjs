export function isCorrect(question, picked) {
  return picked === question.answer;
}

export function summarise(results) {
  const correct = results.filter(Boolean).length;
  const total = results.length;
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percent };
}

export function verdict(percent) {
  if (percent >= 80) return "Excellent!";
  if (percent >= 50) return "Good effort.";
  return "Keep practising.";
}

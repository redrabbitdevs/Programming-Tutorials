export interface Summary {
  correct: number;
  total: number;
  percent: number;
}

export function summarise(results: boolean[]): Summary {
  const correct = results.filter(Boolean).length;
  const total = results.length;
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percent };
}

export function verdict(percent: number): string {
  if (percent >= 80) return "Excellent!";
  if (percent >= 50) return "Good effort.";
  return "Keep practising.";
}

const scores: Record<string, number> = { ada: 90 };

try {
  console.log(scores.bob.toFixed(1));
} catch (error) {
  console.log(String(error));
}

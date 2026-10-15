const attempts = [
  () => undefinedVariable,
  () => null.length,
  () => new Array(-1),
  () => JSON.parse("{bad json"),
  () => (1.5).toFixed(101),
  () => decodeURIComponent("%"),
];

for (const attempt of attempts) {
  try {
    attempt();
  } catch (error) {
    console.log(error.name);
  }
}

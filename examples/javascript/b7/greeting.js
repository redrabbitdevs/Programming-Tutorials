export function greeting(name, hour) {
  const who = name.trim() === "" ? "stranger" : name.trim();
  if (hour < 12) return `Good morning, ${who}!`;
  if (hour < 18) return `Good afternoon, ${who}!`;
  return `Good evening, ${who}!`;
}

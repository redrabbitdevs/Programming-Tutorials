const Level = { Low: 0, High: 1 } as const;
type Level = (typeof Level)[keyof typeof Level];

const level: Level = Level.High;
const names = ["Low", "High"];
console.log(names[level]);

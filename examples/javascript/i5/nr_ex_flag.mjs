function flag(env, name) {
  const value = env[name]?.toLowerCase();
  return ["1", "true", "yes"].includes(value);
}

const env = { A: "1", B: "TRUE", C: "no", D: "false" };
const names = ["A", "B", "C", "D", "MISSING"];
console.log(names.map((name) => flag(env, name)).join(" "));

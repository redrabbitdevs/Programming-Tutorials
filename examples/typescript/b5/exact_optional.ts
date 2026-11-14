interface Settings {
  theme?: string;
}

const unset: Settings = {};
const cleared: Settings = { theme: undefined };

console.log("theme" in unset, "theme" in cleared);

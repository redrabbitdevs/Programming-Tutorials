const defaults = { color: "red", size: { width: 1, height: 1 } };
const theme = { size: { width: 5 } };
const user = { color: "blue" };

const merged = {
  ...defaults,
  ...theme,
  ...user,
  size: { ...defaults.size, ...theme.size, ...user.size },
};

console.log(merged);
console.log(defaults);

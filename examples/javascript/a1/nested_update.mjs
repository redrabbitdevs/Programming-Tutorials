function setIn(object, [key, ...rest], value) {
  const next = rest.length === 0 ? value : setIn(object[key], rest, value);
  return Array.isArray(object)
    ? object.with(key, next)
    : { ...object, [key]: next };
}

const state = {
  user: { name: "Ada", prefs: { theme: "light" } },
  cart: { items: [1, 2] },
};
const next = setIn(state, ["user", "prefs", "theme"], "dark");

console.log(next.user.prefs.theme, state.user.prefs.theme);
console.log(next.cart === state.cart, next.user === state.user);

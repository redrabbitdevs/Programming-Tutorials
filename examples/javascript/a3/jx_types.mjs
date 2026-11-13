function typedReplacer(key, value) {
  const original = this[key];
  if (original instanceof Date) return { $type: "Date", value };
  if (value instanceof Map) return { $type: "Map", value: [...value] };
  if (value instanceof Set) return { $type: "Set", value: [...value] };
  return value;
}

function typedReviver(key, value) {
  if (value?.$type === "Date") return new Date(value.value);
  if (value?.$type === "Map") return new Map(value.value);
  if (value?.$type === "Set") return new Set(value.value);
  return value;
}

const session = {
  started: new Date(Date.UTC(2026, 9, 18, 9, 30)),
  roles: new Set(["reader", "editor"]),
  visits: new Map([["home", 3], ["docs", 1]]),
};

const text = JSON.stringify(session, typedReplacer);
console.log(text);
const back = JSON.parse(text, typedReviver);
console.log(back.started.toISOString(), back.roles.has("editor"));
console.log(back.visits.get("home"));

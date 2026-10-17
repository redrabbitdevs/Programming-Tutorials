function lookup(data, path) {
  let value = data;
  for (const key of path.split(".")) {
    const ok = value !== null && typeof value === "object"
      && Object.hasOwn(value, key);
    if (!ok) return "";
    value = value[key];
  }
  return typeof value === "string" || typeof value === "number" ? value : "";
}

function fill(template, data) {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g,
    (match, path) => lookup(data, path));
}

const template = "Hi {{ user.name }}, you have {{count}} new "
  + "{{user.__proto__}}{{user.constructor}}messages.";
console.log(fill(template, { user: { name: "Ada" }, count: 3 }));

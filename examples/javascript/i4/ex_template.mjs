function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "?");
}

const template = "Hello {name}, you owe {amount} by {due}.";
console.log(fill(template, { name: "Ada", amount: "$12" }));

const defaults = {
  theme: "light",
  fontSize: 14,
  editor: { tabWidth: 4, wrap: false },
};

const saved = {
  fontSize: 16,
  editor: { wrap: true },
};

const shallow = { ...defaults, ...saved };
console.log(shallow);

const merged = {
  ...defaults,
  ...saved,
  editor: { ...defaults.editor, ...saved.editor },
};
console.log(merged);

console.log(defaults.editor);

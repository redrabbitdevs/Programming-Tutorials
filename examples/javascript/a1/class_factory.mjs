const registry = new Map();

function registered(Class) {
  registry.set(Class.name, Class);
  return Class;
}

function withCreatedAt(Base) {
  return class extends Base {
    createdAt = "2026-10-17";
  };
}

const Note = registered(withCreatedAt(class Note {
  constructor(text) {
    this.text = text;
  }
}));

const note = new Note("buy milk");
console.log(note.text, note.createdAt, note instanceof Note);
console.log(JSON.stringify(Note.name), [...registry.keys()]);

function withCreatedAtNamed(Base) {
  const Stamped = class extends Base {
    createdAt = "2026-10-17";
  };
  Object.defineProperty(Stamped, "name", { value: Base.name });
  return Stamped;
}

const Task = registered(withCreatedAtNamed(class Task {}));
console.log(Task.name, [...registry.keys()]);

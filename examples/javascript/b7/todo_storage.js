const KEY = "todos";

function isTodo(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    Number.isInteger(value.id) &&
    typeof value.text === "string" &&
    typeof value.done === "boolean"
  );
}

export function getStorage(win) {
  try {
    return win.localStorage;
  } catch {
    return null;
  }
}

export function loadTodos(storage) {
  if (storage === null) return [];
  try {
    const raw = storage.getItem(KEY);
    if (raw === null) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isTodo) : [];
  } catch {
    return [];
  }
}

export function saveTodos(storage, todos) {
  if (storage === null) return false;
  try {
    storage.setItem(KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}

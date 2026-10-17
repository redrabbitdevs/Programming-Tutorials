const entities = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
};
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => entities[c]);

class SafeHtml {
  constructor(text) {
    this.text = text;
  }
  toString() {
    return this.text;
  }
}

function render(value) {
  if (value instanceof SafeHtml) return value.text;
  if (Array.isArray(value)) return value.map(render).join("");
  return escapeHtml(value);
}

function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) {
    out += render(values[i]) + strings[i + 1];
  }
  return new SafeHtml(out);
}

const name = '<img src=x onerror="alert(1)">';
const tags = ["a&b", "c"];

const page = html`<h1>Hello, ${name}</h1>
<ul>${tags.map((t) => html`<li>${t}</li>`)}</ul>`;
console.log(String(page));

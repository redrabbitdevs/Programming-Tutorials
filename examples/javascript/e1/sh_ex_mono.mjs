// Events arrive from five sources, each with its own extra field.
const raw = [
  { type: "click", x: 1 },
  { type: "key", code: 2 },
  { type: "scroll", dy: 3 },
  { type: "touch", id: 4 },
  { type: "resize", w: 5 },
];

// Normalise once at the edge: every event gets the same three fields.
const events = raw.map((e) => ({ type: e.type, value: 0, source: e }));

function typeOf(event) {
  return event.type;
}

for (const event of events) typeOf(event);

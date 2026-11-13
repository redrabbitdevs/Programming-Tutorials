// Allowed preference keys and the type each value must have.
const SCHEMA = new Map([
  ["theme", "string"],
  ["fontSize", "number"],
  ["notifications", "boolean"],
]);

// Parse a JSON body into a fresh preferences object, keeping only known
// keys with the right type. Returns null when the body is not an object.
function parsePreferences(body) {
  let input;
  try {
    input = JSON.parse(body);
  } catch {
    return null;
  }
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }
  const prefs = Object.create(null);
  for (const [key, type] of SCHEMA) {
    if (Object.hasOwn(input, key) && typeof input[key] === type) {
      prefs[key] = input[key];
    }
  }
  return prefs;
}

const bodies = [
  '{"theme": "dark", "fontSize": 14}',
  '{"theme": "dark", "__proto__": {"isAdmin": true}}',
  '{"constructor": {"prototype": {"isAdmin": true}}, "notifications": false}',
  '{"fontSize": "14px"}',
  '[1, 2, 3]',
];
for (const body of bodies) console.log(parsePreferences(body));
console.log("isAdmin anywhere:", {}.isAdmin);

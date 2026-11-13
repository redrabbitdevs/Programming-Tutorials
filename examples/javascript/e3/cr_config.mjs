// Read secrets from the environment, fail fast if one is missing, and
// never print them.
function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`missing environment variable ${name}`);
  return value;
}

const config = {
  databaseUrl: required("DATABASE_URL"),
  apiKey: required("PAYMENTS_API_KEY"),
};
const mask = (s) => `${s.slice(0, 4)}... (${s.length} characters)`;
console.log("database:", new URL(config.databaseUrl).host);
console.log("payments key:", mask(config.apiKey));

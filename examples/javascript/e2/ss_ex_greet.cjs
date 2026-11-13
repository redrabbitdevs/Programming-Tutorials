const { startupSnapshot } = require("node:v8");

// Built once, when the snapshot is made.
const phrases = new Map([["en", "Hello"], ["fr", "Bonjour"], ["de", "Hallo"]]);
let language = "en";

// Runs on every start from the snapshot, before the main function:
// read what can differ between runs here, not at build time.
startupSnapshot.addDeserializeCallback(() => {
  language = process.env.GREETING_LANG ?? "en";
});

startupSnapshot.setDeserializeMainFunction(() => {
  const name = process.argv.at(-1);
  console.log(`${phrases.get(language)}, ${name}!`);
});

const inputs = ["aGk=", "aGk", "aG k=", "a@k=", "-_-_AQ"];

for (const input of inputs) {
  try {
    const bytes = Uint8Array.fromBase64(input, { lastChunkHandling: "strict" });
    console.log(JSON.stringify(input), bytes);
  } catch (error) {
    console.log(JSON.stringify(input), error.name);
  }
}

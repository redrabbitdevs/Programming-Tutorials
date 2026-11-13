const features = {
  "Float16Array": () => typeof Float16Array === "function",
  "Promise.try": () => typeof Promise.try === "function",
  "Uint8Array toHex": () => typeof Uint8Array.prototype.toHex === "function",
  "Iterator.concat": () => typeof Iterator.concat === "function",
  "Temporal": () => typeof Temporal === "object",
  "Math.sumPrecise": () => typeof Math.sumPrecise === "function",
};

for (const [name, available] of Object.entries(features)) {
  console.log(name.padEnd(18), available() ? "yes" : "no");
}

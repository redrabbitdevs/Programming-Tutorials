console.log("reverse plugin loaded");

export default function run(text) {
  return [...text].reverse().join("");
}

console.log("shout plugin loaded");

export const name = "shout";

export default function run(text) {
  return text.toUpperCase() + "!";
}

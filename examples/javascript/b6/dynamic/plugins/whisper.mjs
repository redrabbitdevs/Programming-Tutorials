console.log("whisper plugin loaded");

export const name = "whisper";

export default function run(text) {
  return text.toLowerCase() + "...";
}

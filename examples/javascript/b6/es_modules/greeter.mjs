export const defaultName = "world";

export default function greet(name = defaultName) {
  return `Hello, ${name}!`;
}

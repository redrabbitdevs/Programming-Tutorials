import { slugify as fast } from "./index.js";

export function slugify(title) {
  if (typeof title !== "string") {
    throw new TypeError("slugify expects a string");
  }
  return fast(title);
}

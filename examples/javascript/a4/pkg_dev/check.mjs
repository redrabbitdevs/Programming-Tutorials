import { slugify } from "@example/slug";

try {
  slugify(42);
} catch (error) {
  console.log(error.message);
}

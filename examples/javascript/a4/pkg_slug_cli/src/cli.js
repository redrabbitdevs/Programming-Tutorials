import { slugify } from "@example/slug";

console.log(slugify(process.argv[2] ?? ""));

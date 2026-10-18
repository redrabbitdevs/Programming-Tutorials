import { slugify } from "@example/slug";
import pkg from "@example/slug/package.json" with { type: "json" };

console.log(slugify("Crème Brûlée: A History"));
console.log(`${pkg.name}@${pkg.version}`);

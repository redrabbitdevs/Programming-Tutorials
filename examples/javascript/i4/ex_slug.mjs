function slugify(title) {
  return title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

console.log(slugify("Crème Brûlée à la Carte!"));
console.log(slugify("  Año nuevo -- 2027  "));

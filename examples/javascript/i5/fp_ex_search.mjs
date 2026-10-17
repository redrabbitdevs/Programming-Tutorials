function searchUrl(base, params) {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, value);
  }
  return url;
}

const url = searchUrl("https://shop.test/search", {
  q: "red shoes",
  size: 42,
  color: undefined,
});
console.log(url.href);
console.log(url.searchParams.get("q"));

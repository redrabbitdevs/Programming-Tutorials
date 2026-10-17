const url = new URL("https://example.com:8080/a/b.html?q=js&page=2#top");
console.log(url.protocol, url.hostname, url.port);
console.log(url.pathname, url.hash);
console.log(url.searchParams.get("q"), url.origin);

url.searchParams.set("page", "3");
url.searchParams.append("tag", "x y");
console.log(url.href);

console.log(new URL("../c", "https://example.com/a/b/").href);
console.log(URL.canParse("not a url"));
console.log(URL.canParse("/a", "http://x.test"));

try {
  new URL("not a url");
} catch (error) {
  console.log(error.name, error.code);
}

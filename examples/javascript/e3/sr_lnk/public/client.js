import { checkUrl } from "/links.mjs";

const form = document.querySelector("#shorten");
const result = document.querySelector("#result");

function showLink(href) {
  const link = Object.assign(document.createElement("a"),
    { href, textContent: href });
  result.replaceChildren(link);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = form.elements.url.value.trim();
  const problem = checkUrl(url);
  if (problem) return void (result.textContent = problem);
  const response = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  const body = await response.json();
  if (!response.ok) return void (result.textContent = body.error);
  showLink(new URL(`/${body.code}`, location.href).href);
});

const comment = new URLSearchParams(location.search).get("c") ?? "";
const box = document.querySelector("#comment");

// Dangerous: the browser parses the text as HTML.
// ?c=<img src=x onerror=alert(document.cookie)> runs the attacker's code.
// box.innerHTML = comment;

// Safe: the text stays text, whatever it contains.
box.textContent = comment;

// Safe for structure too: build elements, set text on them.
const quote = document.createElement("blockquote");
quote.textContent = comment;
box.after(quote);

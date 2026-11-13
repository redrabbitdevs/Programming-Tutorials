// Served with the header:
// Content-Security-Policy: require-trusted-types-for 'script';
//   trusted-types escape
const escaper = trustedTypes.createPolicy("escape", {
  createHTML: (text) => text
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
});

const box = document.querySelector("#comment");
try {
  box.innerHTML = "<b>raw</b>"; // a plain string: blocked
} catch (error) {
  console.log(error.name); // TypeError
}
box.innerHTML = escaper.createHTML("<b>shown as text</b>");

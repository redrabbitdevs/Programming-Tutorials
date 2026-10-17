const query = "1+1";
const pattern = RegExp.escape(query);
console.log(pattern);
console.log("is 1+1=2?".replace(new RegExp(pattern, "g"), "[$&]"));
console.log(new RegExp(query).test("is 1+1=2?"));

const escapeOld = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
console.log(escapeOld("a.b (c)"));

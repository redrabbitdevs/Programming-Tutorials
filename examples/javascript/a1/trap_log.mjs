const names = ["get", "set", "has", "deleteProperty", "ownKeys",
  "getOwnPropertyDescriptor", "defineProperty"];
let seen = [];
const handler = {};
for (const name of names) {
  handler[name] = (...args) => {
    seen.push(name);
    return Reflect[name](...args);
  };
}

const p = new Proxy({ a: 1, b: 2 }, handler);
function show(label) {
  console.log(label.padEnd(14), seen.join(", "));
  seen = [];
}

p.a;
show("read");
p.c = 3;
show("assign");
"a" in p;
show("in");
delete p.b;
show("delete");
Object.keys(p);
show("Object.keys");

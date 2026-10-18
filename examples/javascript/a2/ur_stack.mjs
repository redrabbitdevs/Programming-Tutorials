class Conn {
  constructor(name) {
    if (name === "bad") throw new Error(`cannot open ${name}`);
    this.name = name;
    console.log("open", name);
  }
  [Symbol.dispose]() {
    console.log("close", this.name);
  }
}

function openPool(names) {
  using stack = new DisposableStack();
  const conns = names.map((name) => stack.use(new Conn(name)));
  stack.defer(() => console.log("pool closed"));
  return { conns, cleanup: stack.move() };
}

{
  const pool = openPool(["a", "b"]);
  using cleanup = pool.cleanup;
  console.log(pool.conns.length, "connections in use");
}

try {
  openPool(["c", "bad"]);
} catch (error) {
  console.log(error.message);
}

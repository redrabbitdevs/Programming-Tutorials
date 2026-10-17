const moduleLevel = "module";
globalThis.shared = "global";

function look() {
  const local = "local";
  const code = "[typeof local, typeof moduleLevel, typeof shared]";
  console.log("direct:  ", eval(code));
  console.log("indirect:", (0, eval)(code));
  console.log("optional:", eval?.(code));
}
look();

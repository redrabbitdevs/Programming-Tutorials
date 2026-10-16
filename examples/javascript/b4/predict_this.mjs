const robot = {
  name: "Robo",
  hello() {
    return this.name;
  },
};
const copy = { name: "Copy", hello: robot.hello };
const loose = robot.hello;
const bound = robot.hello.bind({ name: "Bound" });

function attempt(label, fn) {
  try {
    console.log(label, fn());
  } catch (error) {
    console.log(label, error.name);
  }
}

attempt("1:", () => robot.hello());
attempt("2:", () => copy.hello());
attempt("3:", () => loose());
attempt("4:", () => bound());
attempt("5:", () => bound.call({ name: "Other" }));
attempt("6:", () => robot.hello.call({ name: "Call" }));

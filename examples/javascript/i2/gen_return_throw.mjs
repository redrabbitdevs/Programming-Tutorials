function* resilient() {
  while (true) {
    try {
      const input = yield "ready";
      console.log("got", input);
    } catch (error) {
      console.log("caught", error.message);
      yield "recovered";
    }
  }
}

const gen = resilient();
console.log(gen.next());
console.log(gen.next("a"));
console.log(gen.throw(new Error("boom")));
console.log(gen.next());
console.log(gen.return("bye"));
console.log(gen.next());

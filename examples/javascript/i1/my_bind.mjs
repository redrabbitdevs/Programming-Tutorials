function myBind(fn, thisArg, ...preset) {
  return function (...args) {
    return fn.call(thisArg, ...preset, ...args);
  };
}

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const sayHi = myBind(greet, { name: "Ada" }, "Hi");
console.log(sayHi("!"));
console.log(sayHi("?"));

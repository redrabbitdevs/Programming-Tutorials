const user = {
  name: "Ada",
  greet() {
    return `Hello, I am ${this.name}`;
  },
};

const detached = user.greet;
try {
  console.log(detached());
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

function runLater(callback) {
  return callback();
}
try {
  runLater(user.greet);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

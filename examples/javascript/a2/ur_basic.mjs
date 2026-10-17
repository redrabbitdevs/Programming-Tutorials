class Connection {
  constructor(name) {
    this.name = name;
    console.log(`open ${name}`);
  }
  query(sql) {
    return `${this.name}: ${sql}`;
  }
  [Symbol.dispose]() {
    console.log(`close ${this.name}`);
  }
}

function report() {
  using db = new Connection("db");
  using cache = new Connection("cache");
  console.log(db.query("SELECT 1"));
  return "report done";
}
console.log(report());

function failing() {
  using db = new Connection("db");
  throw new Error("query failed");
}
try {
  failing();
} catch (error) {
  console.log("caught:", error.message);
}

{
  using maybe = null;
  console.log("null is allowed:", maybe);
}
try {
  using plain = { name: "not disposable" };
} catch (error) {
  console.log(error.name);
}

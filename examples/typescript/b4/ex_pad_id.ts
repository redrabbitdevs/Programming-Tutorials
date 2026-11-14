type Id = string | number;

function padId(id: Id): string {
  return String(id).padStart(5, "0");
}

console.log(padId(42), padId("7"));

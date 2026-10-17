function toSnake(name) {
  return name.replace(/(?<=[a-z0-9])(?=[A-Z])/g, "_").toLowerCase();
}

console.log(toSnake("userName"));
console.log(toSnake("getUserId"));
console.log(toSnake("already_snake"));
console.log(toSnake("version2Beta"));

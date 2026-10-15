function reassign(value) {
  value = "changed";
  return value;
}
let text = "original";
reassign(text);
console.log(text);

function addItem(list) {
  list.push("new");
}
const items = ["old"];
addItem(items);
console.log(items);

function replaceList(list) {
  list = ["replacement"];
}
replaceList(items);
console.log(items);

const defaults = { colour: "grey", size: 10 };
const widget = Object.create(defaults);

console.log(widget.colour);
widget.colour = "red";
console.log(widget.colour, defaults.colour);

delete widget.colour;
console.log(widget.colour);

defaults.size = 12;
console.log(widget.size);

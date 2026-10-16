const rectangle = {
  width: 4,
  height: 3,
  get area() {
    return this.width * this.height;
  },
  set size(value) {
    this.width = value;
    this.height = value;
  },
};

console.log(rectangle.area);
rectangle.size = 5;
console.log(rectangle.width, rectangle.height, rectangle.area);

try {
  rectangle.area = 99;
} catch (error) {
  console.log(error.name);
}

const PI = 3.14159;

function circleArea(r) {
  return PI * r * r;
}

function rectArea(w, h) {
  return w * h;
}

module.exports = { circleArea, rectArea };

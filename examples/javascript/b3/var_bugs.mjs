var total = 0;
var prices = [5, 10, 15];

for (var i = 0; i < prices.length; i++) {
  total += prices[i];
}

var callbacks = [];
for (var n = 1; n <= 3; n++) {
  callbacks.push(function () {
    return "step " + n;
  });
}

if (total > 20) {
  var message = "big order";
}

console.log(total, i);
console.log(callbacks.map(function (cb) { return cb(); }));
console.log(message);

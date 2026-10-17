console.log(0 == "", null == undefined, [] == false, "1" == 1);
console.log(0 === "", null === undefined, [] === false, "1" === 1);

const total = 10;
try {
  console.log(totl + 1);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

const withVar = [];
for (var i = 0; i < 3; i++) withVar.push(() => i);

const withLet = [];
for (let j = 0; j < 3; j++) withLet.push(() => j);

console.log(withVar.map((f) => f()), withLet.map((f) => f()));

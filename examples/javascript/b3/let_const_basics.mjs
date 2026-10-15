let score = 10;
score = score + 5;
console.log(score);

const limit = 100;
try {
  limit = 200;
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

const scores = [10, 20];
scores.push(30);
console.log(scores);

const config = { retries: 3 };
config.retries = 5;
console.log(config);

const secret = 37;
const guesses = [50, 25, 37, 10];

let tries = 0;
for (const guess of guesses) {
  tries++;
  if (guess === secret) {
    console.log(`Guess ${tries}: ${guess} is right`);
    break;
  }
  console.log(`Guess ${tries}: ${guess} is too ${guess < secret ? "low" : "high"}`);
}

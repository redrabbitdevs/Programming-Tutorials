function setSpeed(speed: "fast" | "slow"): string {
  return `speed is ${speed}`;
}

const a = "fast";
let b = "fast";
console.log(setSpeed(a));
console.log(setSpeed(b));

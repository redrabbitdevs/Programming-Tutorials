const whole: number = 2;
const huge: bigint = 3n;

try {
  console.log(whole + huge);
} catch (error) {
  console.log(String(error));
}

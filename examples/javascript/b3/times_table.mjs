const size = 5;
for (let row = 1; row <= size; row++) {
  let line = "";
  for (let col = 1; col <= size; col++) {
    line += String(row * col).padStart(4);
  }
  console.log(line);
}

function meetsMinimum(version, minimum) {
  const a = version.split(".").map(Number);
  const b = minimum.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] > b[i];
  }
  return true;
}

for (const version of ["22.11.0", "22.12.0", "24.1.0", "26.11.1"]) {
  console.log(version, meetsMinimum(version, "22.12.0"));
}
console.log("this Node:", meetsMinimum(process.versions.node, "22.12.0"));

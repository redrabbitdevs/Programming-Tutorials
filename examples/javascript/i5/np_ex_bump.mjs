function bump(version, kind) {
  let [major, minor, patch] = version.split(".").map(Number);
  if (kind === "major") [major, minor, patch] = [major + 1, 0, 0];
  else if (kind === "minor") [minor, patch] = [minor + 1, 0];
  else patch += 1;
  return `${major}.${minor}.${patch}`;
}

for (const kind of ["patch", "minor", "major"]) {
  console.log(bump("1.2.3", kind));
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function waitFor(check, interval, tries) {
  for (let attempt = 0; attempt < tries; attempt++) {
    if (check()) return attempt;
    await wait(interval);
  }
  throw new Error("gave up");
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPart(name, ms) {
  console.log("start", name);
  await sleep(ms);
  console.log("end", name);
  return name;
}

const header = await fetchPart("header", 30);
const body = await fetchPart("body", 10);
const footer = await fetchPart("footer", 20);
console.log([header, body, footer]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPart(name, ms) {
  console.log("start", name);
  await sleep(ms);
  console.log("end", name);
  return name;
}

const header = await fetchPart("header", 300);
const body = await fetchPart("body", 100);
const footer = await fetchPart("footer", 200);
console.log([header, body, footer]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPart(name, ms) {
  console.log("start", name);
  await sleep(ms);
  console.log("end", name);
  return name;
}

const headerPromise = fetchPart("header", 30);
const bodyPromise = fetchPart("body", 10);
const footerPromise = fetchPart("footer", 20);

const header = await headerPromise;
const body = await bodyPromise;
const footer = await footerPromise;
console.log([header, body, footer]);

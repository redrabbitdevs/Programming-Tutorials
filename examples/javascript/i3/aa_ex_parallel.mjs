const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPart(name, ms) {
  console.log("start", name);
  await sleep(ms);
  console.log("end", name);
  return name;
}

const headerPromise = fetchPart("header", 300);
const bodyPromise = fetchPart("body", 100);
const footerPromise = fetchPart("footer", 200);

const header = await headerPromise;
const body = await bodyPromise;
const footer = await footerPromise;
console.log([header, body, footer]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPage(page) {
  console.log("  fetching page", page);
  await sleep(5);
  const items = [1, 2, 3].map((n) => (page - 1) * 3 + n);
  return { items, next: page < 3 ? page + 1 : null };
}

async function* allItems() {
  let page = 1;
  while (page !== null) {
    const result = await fetchPage(page);
    yield* result.items;
    page = result.next;
  }
}

for await (const item of allItems()) {
  console.log("item", item);
  if (item === 4) break;
}

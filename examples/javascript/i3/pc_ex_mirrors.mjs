const mirror = (name, ms, ok) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (ok ? resolve(name) : reject(new Error(name))), ms);
  });

async function fastest(mirrors) {
  try {
    return await Promise.any(mirrors);
  } catch (error) {
    const names = error.errors.map((e) => e.message);
    return `all failed: ${names.join(", ")}`;
  }
}

console.log(await fastest([mirror("eu", 300, true), mirror("us", 10, true)]));
console.log(await fastest([mirror("eu", 5, false), mirror("us", 10, false)]));

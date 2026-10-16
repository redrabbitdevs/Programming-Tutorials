function doubleLater(n, callback) {
  setTimeout(() => {
    if (typeof n !== "number") {
      return callback(new TypeError("not a number"));
    }
    callback(null, n * 2);
  }, 5);
}

function doubleAsync(n) {
  return new Promise((resolve, reject) => {
    doubleLater(n, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

console.log(await doubleAsync(21));
await doubleAsync("x").catch((e) => console.log(e.name + ":", e.message));

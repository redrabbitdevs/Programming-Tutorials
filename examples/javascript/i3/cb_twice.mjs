function checkBad(value, callback) {
  if (value < 0) {
    callback(new Error("negative"));
  }
  callback(null, Math.sqrt(value));
}

function checkGood(value, callback) {
  if (value < 0) {
    return callback(new Error("negative"));
  }
  callback(null, Math.sqrt(value));
}

const show = (error, root) => console.log(error ? "error" : "ok", root);

console.log("bad:");
checkBad(-4, show);
console.log("good:");
checkGood(-4, show);
checkGood(16, show);

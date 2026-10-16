function series(tasks, done) {
  const results = [];
  function next(i) {
    if (i === tasks.length) return done(null, results);
    tasks[i]((error, value) => {
      if (error) return done(error);
      results.push(value);
      next(i + 1);
    });
  }
  next(0);
}

const wait = (ms, value) => (cb) => setTimeout(cb, ms, null, value);
const broken = (cb) => cb(new Error("stop here"));

series([wait(20, "a"), wait(5, "b"), wait(10, "c")], (error, results) => {
  console.log(error, results);
  series([wait(5, "x"), broken, wait(5, "never")], (error, results) => {
    console.log(error.message, results);
  });
});

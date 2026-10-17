function loadUser(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      callback(new Error(`bad id: ${id}`));
      return;
    }
    callback(null, { id, name: `user${id}` });
  }, 10 + id * 10);
}

loadUser(1, (error, user) => {
  if (error) {
    console.log("failed:", error.message);
    return;
  }
  console.log("loaded", user);
});
loadUser(0, (error) => console.log("failed:", error.message));
console.log("requests sent");

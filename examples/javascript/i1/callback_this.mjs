const button = {
  name: "save",
  handlers: [],
  on(fn) {
    this.handlers.push(fn);
  },
  click() {
    for (const fn of this.handlers) {
      fn.call(this, "clicked");
    }
  },
};

button.on(function (what) {
  console.log(`${this.name} ${what}`);
});
button.on((what) => console.log(`${this?.name} ${what}`));
button.click();

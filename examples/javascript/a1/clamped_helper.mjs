function clamp(Class, name, min, max) {
  const values = new WeakMap();
  Object.defineProperty(Class.prototype, name, {
    get() {
      return values.get(this) ?? min;
    },
    set(value) {
      values.set(this, Math.min(max, Math.max(min, value)));
    },
  });
}

class Speaker {}
clamp(Speaker, "bass", -6, 6);

const s = new Speaker();
s.bass = 9;
console.log(s.bass, new Speaker().bass, Object.keys(s));

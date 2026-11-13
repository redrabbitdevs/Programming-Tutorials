if (typeof Uint8Array.prototype.toHex !== "function") {
  Object.defineProperty(Uint8Array.prototype, "toHex", {
    value: function toHex() {
      return Array.from(this, (b) => b.toString(16).padStart(2, "0")).join("");
    },
    writable: true,
    configurable: true,
    enumerable: false,
  });
}

console.log(Uint8Array.of(1, 171, 255).toHex());
console.log(Object.keys(Uint8Array.prototype).length);

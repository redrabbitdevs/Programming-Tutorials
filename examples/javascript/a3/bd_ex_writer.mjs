class ByteWriter {
  #buffer = new ArrayBuffer(4, { maxByteLength: 1024 });
  #view = new DataView(this.#buffer);
  #length = 0;

  #ensure(extra) {
    let size = this.#buffer.byteLength;
    while (this.#length + extra > size) size *= 2;
    if (size !== this.#buffer.byteLength) this.#buffer.resize(size);
  }

  uint8(n) {
    this.#ensure(1);
    this.#view.setUint8(this.#length, n);
    this.#length += 1;
  }

  uint16(n) {
    this.#ensure(2);
    this.#view.setUint16(this.#length, n);
    this.#length += 2;
  }

  text(s) {
    const encoded = new TextEncoder().encode(s);
    this.#ensure(encoded.length);
    new Uint8Array(this.#buffer).set(encoded, this.#length);
    this.#length += encoded.length;
  }

  bytes() {
    return new Uint8Array(this.#buffer).slice(0, this.#length);
  }

  get capacity() {
    return this.#buffer.byteLength;
  }
}

const writer = new ByteWriter();
writer.uint8(1);
writer.uint16(0xbeef);
writer.text("hé");
writer.uint8(255);
console.log(writer.bytes());
console.log(`buffer: ${writer.capacity} bytes`);

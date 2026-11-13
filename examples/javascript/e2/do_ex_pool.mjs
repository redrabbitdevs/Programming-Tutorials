class BufferPool {
  #free = [];
  created = 0;
  constructor(size) {
    this.size = size;
  }
  acquire() {
    if (this.#free.length > 0) return this.#free.pop();
    this.created++;
    return new Uint8Array(this.size);
  }
  release(buffer) {
    buffer.fill(0);
    this.#free.push(buffer);
  }
}

const pool = new BufferPool(1024);
const encoder = new TextEncoder();

// Encode a message into a pooled buffer and return a checksum of its bytes.
function handle(message) {
  const buffer = pool.acquire();
  try {
    const { written } = encoder.encodeInto(message, buffer);
    let sum = 0;
    for (let i = 0; i < written; i++) sum = (sum + buffer[i]) % 65_521;
    return sum;
  } finally {
    pool.release(buffer);
  }
}

let total = 0;
for (let i = 0; i < 10_000; i++) total += handle(`message number ${i}`);
console.log("messages handled: 10000, checksum total:", total);
console.log("buffers created:", pool.created);

const view = new DataView(new ArrayBuffer(4));

view.setUint32(0, 0x12345678);
console.log(new Uint8Array(view.buffer));

view.setUint32(0, 0x12345678, true);
console.log(new Uint8Array(view.buffer));
console.log(view.getUint32(0, true).toString(16));
console.log(view.getUint32(0).toString(16));

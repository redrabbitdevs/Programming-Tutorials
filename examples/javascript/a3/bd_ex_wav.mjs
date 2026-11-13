function writeTag(view, offset, tag) {
  for (let i = 0; i < 4; i++) view.setUint8(offset + i, tag.charCodeAt(i));
}

function readTag(view, offset) {
  let tag = "";
  for (let i = 0; i < 4; i++) {
    tag += String.fromCharCode(view.getUint8(offset + i));
  }
  return tag;
}

function wavHeader({ sampleRate, channels, bitsPerSample, samples }) {
  const blockAlign = channels * (bitsPerSample / 8);
  const dataBytes = samples * blockAlign;
  const view = new DataView(new ArrayBuffer(44));
  writeTag(view, 0, "RIFF");
  view.setUint32(4, 36 + dataBytes, true);
  writeTag(view, 8, "WAVE");
  writeTag(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeTag(view, 36, "data");
  view.setUint32(40, dataBytes, true);
  return new Uint8Array(view.buffer);
}

function parseWav(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return {
    tags: `${readTag(view, 0)} ${readTag(view, 8)}`,
    fields: {
      format: view.getUint16(20, true),
      channels: view.getUint16(22, true),
      sampleRate: view.getUint32(24, true),
      byteRate: view.getUint32(28, true),
      bitsPerSample: view.getUint16(34, true),
      dataBytes: view.getUint32(40, true),
    },
  };
}

const header = wavHeader({
  sampleRate: 8000, channels: 1, bitsPerSample: 16, samples: 8000,
});
const { tags, fields } = parseWav(header);
console.log(tags);
console.log(fields);
console.log(`duration: ${fields.dataBytes / fields.byteRate} s`);

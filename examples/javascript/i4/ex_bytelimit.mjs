const encoder = new TextEncoder();

function cutBytes(text, maxBytes) {
  let used = 0;
  let result = "";
  for (const ch of text) {
    const size = encoder.encode(ch).length;
    if (used + size > maxBytes) {
      break;
    }
    used += size;
    result += ch;
  }
  return result;
}

const cut = cutBytes("Héllo wörld 😀", 10);
console.log(cut, encoder.encode(cut).length);
console.log(cutBytes("ab😀", 5), cutBytes("ab😀", 6));

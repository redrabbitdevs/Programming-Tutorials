function isHex(text: string): boolean {
  if (/^0x[0-9a-f]+$/i) {
    return true;
  }
  return false;
}

console.log(isHex("0xff"), isHex("hello"));

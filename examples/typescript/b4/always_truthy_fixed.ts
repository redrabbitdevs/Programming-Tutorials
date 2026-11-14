function isHex(text: string): boolean {
  return /^0x[0-9a-f]+$/i.test(text);
}

console.log(isHex("0xff"), isHex("hello"));

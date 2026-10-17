function cookedAndRaw(strings) {
  return { cooked: strings[0], raw: strings.raw[0] };
}

console.log(cookedAndRaw`\unicode and \xyz`);
console.log(String.raw`\unicode`);

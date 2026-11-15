interface Flags {
  verbose: boolean;
  files: string[];
}

function parseFlags(args: string[]): Flags {
  const flags: Flags = { verbose: false, files: [] };
  for (const arg of args) {
    if (arg === "-v") {
      flags.verbose = true;
    } else {
      flags.files.push(arg);
    }
  }
  return flags;
}

console.log(parseFlags(["-v", "a.txt", "b.txt"]));
console.log(parseFlags(process.argv.slice(2)));

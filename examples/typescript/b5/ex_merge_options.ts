interface Options {
  verbose: boolean;
}

interface Options {
  retries: number;
}

function run(options: Options): string {
  return `verbose=${options.verbose} retries=${options.retries}`;
}

console.log(run({ verbose: true, retries: 3 }));

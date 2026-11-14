interface Options {
  retries?: number;
  label?: string;
}

function summary(options: Options): string {
  const retries = options.retries ?? 3;
  const label = options.label ?? "job";
  return `${label}: ${retries} retries`;
}

console.log(summary({}));
console.log(summary({ retries: 0, label: "sync" }));

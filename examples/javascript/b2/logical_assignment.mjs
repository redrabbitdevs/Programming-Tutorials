const options = { retries: 0, name: "", debug: undefined, verbose: true };

options.retries ??= 3;
options.name ||= "anonymous";
options.debug ??= false;
options.verbose &&= "yes";

console.log(options);

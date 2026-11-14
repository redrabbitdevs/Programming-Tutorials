interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[console] ${message}`);
  }
}

class ListLogger implements Logger {
  lines: string[] = [];

  log(message: string): void {
    this.lines.push(message);
  }
}

const list = new ListLogger();
for (const logger of [new ConsoleLogger(), list]) {
  logger.log("started");
}
console.log(list.lines);

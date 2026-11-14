interface Logger {
  log(message: string): void;
  flush(): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

new ConsoleLogger().log("hi");

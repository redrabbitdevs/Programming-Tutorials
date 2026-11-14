interface Logger {
  log(message: string): void;
}

class TimestampLogger implements Logger {
  log(message: string): void {
    console.log(`T0 ${message}`);
  }
}

class UpperLogger implements Logger {
  log(message: string): void {
    console.log(message.toUpperCase());
  }
}

const loggers: Logger[] = [new TimestampLogger(), new UpperLogger()];
for (const logger of loggers) {
  logger.log("saved");
}

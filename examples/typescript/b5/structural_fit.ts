interface Logger {
  log(message: string): void;
}

class PlainLogger {
  log(message: string): void {
    console.log(`plain: ${message}`);
  }
}

const objectLogger = {
  log: (message: string) => console.log(`object: ${message}`),
  level: "info",
};

const loggers: Logger[] = [new PlainLogger(), objectLogger];
for (const logger of loggers) {
  logger.log("hello");
}

class HttpError extends Error {
  constructor(status, message, options) {
    super(message, options);
    this.name = "HttpError";
    this.status = status;
  }
}

class NotFoundError extends HttpError {
  constructor(path, options) {
    super(404, `no page at ${path}`, options);
    this.name = "NotFoundError";
  }
}

function load(path) {
  try {
    throw new Error("disk read failed");
  } catch (cause) {
    throw new NotFoundError(path, { cause });
  }
}

try {
  load("/missing");
} catch (error) {
  console.log(error instanceof NotFoundError, error instanceof HttpError);
  console.log(`${error.name} ${error.status}: ${error.message}`);
  console.log(error.cause.message);
}

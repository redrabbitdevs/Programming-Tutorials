class ValidationError extends Error {
  constructor(field, message, options) {
    super(message, options);
    this.name = "ValidationError";
    this.field = field;
  }
}

function parseAge(text) {
  const age = Number(text);
  if (!Number.isInteger(age)) {
    throw new ValidationError("age", `not a whole number: ${text}`);
  }
  return age;
}

try {
  parseAge("4.5");
} catch (error) {
  console.log(error instanceof ValidationError, error instanceof Error);
  console.log(error.name, error.field, error.message);
  console.log(String(error));
}

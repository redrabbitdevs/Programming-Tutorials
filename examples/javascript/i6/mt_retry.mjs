export async function retry(task, attempts) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

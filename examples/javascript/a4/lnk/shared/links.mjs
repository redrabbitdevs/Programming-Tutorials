const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeId(n) {
  let code = "";
  do {
    code = ALPHABET[n % 62] + code;
    n = Math.floor(n / 62);
  } while (n > 0);
  return code;
}

export function checkUrl(text) {
  if (!URL.canParse(text)) return "not a valid URL";
  const { protocol } = new URL(text);
  if (protocol !== "http:" && protocol !== "https:") {
    return "only http and https links";
  }
  return null;
}

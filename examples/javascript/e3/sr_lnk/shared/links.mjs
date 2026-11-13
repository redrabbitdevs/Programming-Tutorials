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
  if (/[\s\x00-\x1f\x7f]/.test(text)) return "no spaces or control characters";
  if (!URL.canParse(text)) return "not a valid URL";
  const { protocol, username, password } = new URL(text);
  if (protocol !== "http:" && protocol !== "https:") {
    return "only http and https links";
  }
  if (username || password) return "no user names or passwords in links";
  return null;
}

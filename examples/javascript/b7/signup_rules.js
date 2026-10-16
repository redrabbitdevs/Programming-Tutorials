export function validateSignup({
  username = "",
  email = "",
  password = "",
  confirm = "",
}) {
  const errors = {};

  const name = username.trim();
  if (name.length < 3) {
    errors.username = "Use at least 3 characters.";
  } else if (/\s/.test(name)) {
    errors.username = "No spaces, please.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter an address like name@example.com.";
  }

  if (password.length < 8) {
    errors.password = "Use at least 8 characters.";
  }

  if (confirm !== password) {
    errors.confirm = "The passwords do not match.";
  }

  return errors;
}

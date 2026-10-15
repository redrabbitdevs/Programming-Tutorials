const settings = Object.freeze({ theme: "dark" });

try {
  settings.theme = "light";
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

console.log(settings.theme);

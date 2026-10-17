const { proxy: settings, revoke } = Proxy.revocable({ theme: "dark" }, {});

console.log(settings.theme);
revoke();

try {
  console.log(settings.theme);
} catch (error) {
  console.log(error.name);
}

function settings(env) {
  const prefix = "APP_";
  return Object.fromEntries(
    Object.entries(env)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => [key.slice(prefix.length).toLowerCase(), value]),
  );
}

const env = { APP_PORT: "80", APP_NAME: "demo", HOME: "/home/x", APPLE: "red" };
console.log(settings(env));

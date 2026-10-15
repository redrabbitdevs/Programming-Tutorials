const user = { name: "Ada", profile: { address: null }, tags: ["math"] };

console.log(user.profile.address?.city);
console.log(user.settings?.theme);
console.log(user.tags?.[0], user.nothing?.[0]);
console.log(user.greet?.());

try {
  console.log(user.settings.theme);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

console.log(user?.profile?.address?.city.toUpperCase().length);

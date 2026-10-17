for (const attempt of [
  () => decodeURIComponent("100%"),
  () => encodeURIComponent("\uD800"),
]) {
  try {
    attempt();
  } catch (error) {
    console.log(error.name, error.message);
  }
}

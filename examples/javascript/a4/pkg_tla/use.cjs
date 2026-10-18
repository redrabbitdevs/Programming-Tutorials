try {
  require("@example/config");
} catch (error) {
  console.log(error.code);
}

import("@example/config").then(({ settings }) => {
  console.log(settings.theme);
});

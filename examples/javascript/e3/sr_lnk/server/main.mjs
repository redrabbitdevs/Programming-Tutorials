import { createApp } from "./app.mjs";
import { createStore } from "./store.mjs";

const port = Number(process.env.PORT ?? 3000);
createApp(createStore()).listen(port, () => {
  console.log(`Link shortener on http://localhost:${port}/`);
});

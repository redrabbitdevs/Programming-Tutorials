import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node --env-file=.env nr_dotenv.mjs",
  "APP_PORT=9000 node --env-file=.env nr_dotenv.mjs",
  "node nr_dotenv.mjs",
  "node --env-file=missing.env nr_dotenv.mjs",
  "echo $?",
  "node --env-file-if-exists=missing.env nr_dotenv.mjs",
]);

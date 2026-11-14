// Terminal session from "The npm supply chain". Expected transcript: Node
// 26.11.1 with its bundled npm 11.20.0. npm runs offline here, with no audit
// or update check, so the session never touches the network; the lesson's
// commands are the same without these settings.
import { join } from "node:path";
import { session } from "./session.mjs";

const offline = {
  npm_config_offline: "true",
  npm_config_audit: "false",
  npm_config_fund: "false",
  npm_config_update_notifier: "false",
};

session(join(import.meta.dirname, "sc_app"), [
  "npm pack --silent ../sc_greet",
  "npm ci --silent",
  "cat postinstall-ran.txt",
  "node app.mjs",
  "npm install-scripts ls",
  "rm -r node_modules postinstall-ran.txt",
  "npm ci --ignore-scripts --silent",
  "ls",
  "node app.mjs",
  "echo ignore-scripts=true > .npmrc",
  "npm rebuild greet",
  "ls postinstall-ran.txt",
  "npm rebuild greet --ignore-scripts=false",
  "cat postinstall-ran.txt",
  "rm -r node_modules greet-1.0.0.tgz .npmrc postinstall-ran.txt",
], offline);

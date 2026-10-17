import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  { ignores: ["dist/"] },
  {
    files: ["**/*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
    rules: {
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "warn",
    },
  },
]);

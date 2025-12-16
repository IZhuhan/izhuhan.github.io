import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "prefer-const": "error",
      "no-var": "error"
    }
  }
];

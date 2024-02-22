/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "es5",
      },
      {
        usePrettierrc: false,
      },
    ],
    "react/jsx-no-constructed-context-values": [2],
  },
};

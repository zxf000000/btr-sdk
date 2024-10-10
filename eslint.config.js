export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  ignorePatterns: ["node_modules/**/*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/alt-text": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-empty-pattern": "off",
    "prefer-const": "off",
    "no-extra-boolean-cast": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-useless-catch": "off",
    "@typescript-eslint/ban-types": "off",
    "no-empty": "off",
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "simple-import-sort"
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: "*.config.js",
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "simple-import-sort/imports": 2,
    "simple-import-sort/exports": 2,
    "prettier/prettier": [
      2,
      {
        "singleQuote": false,
        "printWidth": 100,
        "semi": true
      }
    ]
  },
};
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "eslint:recommended"
  ],
  // add your custom rules here
  rules: {
    semi: [2, "never"]
  }
}

module.exports = {
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier", "graphql"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 120
      }
    ],
    "no-underscore-dangle": 0,
    "no-console": 0
    // "graphql/template-strings": ['error', {
    //   env: 'literal',
    //   schemaJson: './',
    // }]
  },
  env: {
    jest: true
  }
};

module.exports = {
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier", "graphql"],
  rules: {
    "prettier/prettier": "error"
    // "graphql/template-strings": ['error', {
    //   env: 'literal',
    //   schemaJson: './', 
    // }]
  },
  env: {
    "jest": true
  }
};

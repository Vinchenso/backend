const auth = require("./Mutation/auth.js");
const Query = require("./Query.js");

module.exports = {
  Mutation: {
    ...auth
  },
  Query
};

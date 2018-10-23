const { GraphQLServer } = require("graphql-yoga");
const gqlConfig = require('./api')
const { models } = require('./db.js');

function createServer() {
  return new GraphQLServer({
    ...gqlConfig,
    context: req => ({...req, models}),
  });
}

module.exports = createServer;

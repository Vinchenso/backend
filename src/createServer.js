const { GraphQLServer } = require('graphql-yoga');
const gqlConfig = require('./api');

function createServer() {
  return new GraphQLServer({
    ...gqlConfig,
  });
}

module.exports = createServer;

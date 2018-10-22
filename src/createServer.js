const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers");

const db = require("./db.js");

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers,
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;

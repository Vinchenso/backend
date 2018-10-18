const { GraphQLServer } = require("graphql-yoga");

const Mutation = require("./resolvers/Mutation.js");
const Query = require("./resolvers/Query.js");

const db = require("./db.js");

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;

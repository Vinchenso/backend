const { GraphQLServer } = require("graphql-yoga");
// const resolvers = require("./resolvers");
const db = require("./db.js");

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
};

function createServer() {
  return new GraphQLServer({
    typeDefs,
    resolvers,
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;

const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const { typeDefs, resolvers } = require('../../src/api');

const runQuery = (query, variables = {}, ctx = {}) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return graphql(schema, query, null, { ...ctx }, variables);
};

module.exports = {
  runQuery,
};

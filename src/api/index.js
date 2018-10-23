const { makeExecutableSchema, mergeSchemas  } = require("graphql-tools");

const path = require('path')
const mergeGraphqlSchemas = require('merge-graphql-schemas')
const fileLoader = mergeGraphqlSchemas.fileLoader
const mergeTypes = mergeGraphqlSchemas.mergeTypes
const mergeResolvers = mergeGraphqlSchemas.mergeResolvers

const typesArray = fileLoader(path.join(__dirname, '../api'), { recursive: true, extensions: '.graphql '}  );
const mergedTypes = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, "../api/**/*.resolvers.*"));
const mergedResolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes, 
  resolvers: mergedResolvers 
});


module.exports = {
  schema
};

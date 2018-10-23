const path = require("path");

const {
  fileLoader,
  mergeTypes,
  mergeResolvers
} = require("merge-graphql-schemas");

const { models } = require("../db.js");

const typesArray = fileLoader(path.join(__dirname, "../api"), {
  recursive: true,
  extensions: ".graphql "
});

const resolversArray = fileLoader(
  path.join(__dirname, "../api/**/*.resolvers.*")
);

module.exports = {
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
  context: req => ({ ...req, models })
};

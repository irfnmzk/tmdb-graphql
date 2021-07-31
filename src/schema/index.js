const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const commonSchema = require("./common");
const companySchema = require("./company");
const genreSchema = require("./genre");
const movieSchema = require("./movie");

const allTypeDefs = [
  commonSchema.typeDefs,
  companySchema.typeDefs,
  genreSchema.typeDefs,
  movieSchema.typeDefs,
];

const allResolvers = [
  commonSchema.resolvers,
  companySchema.resolvers,
  genreSchema.resolvers,
  movieSchema.resolvers,
];

const typeDefs = mergeTypeDefs(allTypeDefs);
const resolvers = mergeResolvers(allResolvers);
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;

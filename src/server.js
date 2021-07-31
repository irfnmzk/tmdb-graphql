const { ApolloServer } = require("@saeris/apollo-server-vercel");

// Data Source
const {
  MovieDataSource,
  GenreDataSource,
  CompanyDataSource,
} = require("./services/tmdb");

// schema
const schema = require("./schema");

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  dataSources: () => ({
    company: new CompanyDataSource(),
    genre: new GenreDataSource(),
    movie: new MovieDataSource(),
  }),
});

module.exports = server;

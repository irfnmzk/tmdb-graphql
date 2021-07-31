const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type Genre {
    id: ID!

    name: String!
  }

  type Query {
    movieGenres: [Genre!]!
    tvGenres: [Genre!]!
  }
`;

const resolvers = {
  Query: {
    movieGenres: async (_, __, { dataSources }) => {
      return dataSources.genre.movies();
    },
    tvGenres: async (_, __, { dataSources }) => {
      return dataSources.genre.tvs();
    },
  },
};

module.exports = {
  resolvers,
  typeDefs,
};

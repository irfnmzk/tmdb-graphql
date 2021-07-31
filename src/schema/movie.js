const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type Movie {
    id: ID!

    adult: Boolean!
    backdropPath: String
    #belong to collections
    budget: Int!
    genres: [Genre!]!
    homepage: String
    imdbId: String
    originalLanguage: String!
    originalTitle: String!
    overview: String
    popularity: Float!
    posterPath: String
    productionCompanies: [Company!]!
    # productionCountries: [Country!]!
    releaseDate: String!
    #spokenLanguages: [Language!]!
    status: String!
    tagline: String
    title: String!
    voteAverage: Float!
    votCount: Int
  }

  type Query {
    movie(id: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    movie: async (_, { id }, { dataSources }) => {
      return dataSources.movie.movie({ id });
    },
  },
};

module.exports = { typeDefs, resolvers };

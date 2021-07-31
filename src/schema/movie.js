const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type Cast implements People {
    id: ID!

    adult: Boolean!
    gender: Int
    knownForDepartment: String
    name: String
    originalName: String
    popularity: Float
    profilePath: String
    castId: Int
    character: String
    creditId: String
    order: Int
  }

  type Crew implements People {
    id: ID!

    adult: Boolean!
    gender: Int
    knownForDepartment: String
    name: String
    originalName: String
    popularity: Float
    profilePath: String
    creditId: String
    departement: String
    job: String
  }

  type MovieCredits {
    cast: [Cast!]!
    crew: [Crew!]!
  }

  type MovieAlternativeTitle {
    iso31661: String!
    title: String!
    type: String
  }

  type MovieExternalId {
    imdbId: String
    facebookId: String
    instagramId: String
    twitterId: String
  }

  type MovieImages {
    backdrops: [Image!]!
    posters: [Image!]!
  }

  type MovieKeyword {
    id: String
    name: String
  }

  type Movie {
    id: ID!

    # base response
    adult: Boolean!
    backdropPath: String
    budget: Int
    genres: [Genre!]!
    homepage: String
    imdbId: String
    originalLanguage: String!
    originalTitle: String!
    overview: String
    popularity: Float!
    posterPath: String
    productionCompanies: [Company!]!
    productionCountries: [Country!]!
    releaseDate: String!
    spokenLanguages: [Language!]!
    status: String
    tagline: String
    title: String!
    voteAverage: Float!
    votCount: Int

    # relations
    alternativeTitles: [MovieAlternativeTitle!]!
    credits: MovieCredits
    externalIds: MovieExternalId
    images: MovieImages
    keywords: [MovieKeyword!]!

    # query
    recommendations(page: Int = 1): MovieResults
  }

  type MovieResults {
    page: Int!
    results: [Movie!]!
    totalPages: Int
    totalResults: Int
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
  Movie: {
    alternativeTitles: async ({ id }, _, { dataSources }) => {
      return dataSources.movie.alternativeTitles({ id });
    },
    credits: async ({ id }, _, { dataSources }) => {
      return dataSources.movie.credits({ id });
    },
    externalIds: async ({ id }, _, { dataSources }) => {
      return dataSources.movie.externalIds({ id });
    },
    images: async ({ id }, _, { dataSources }) => {
      return dataSources.movie.images({ id });
    },
    keywords: async ({ id }, _, { dataSources }) => {
      return dataSources.movie.keywords({ id });
    },
    recommendations: async ({ id }, { page }, { dataSources }) => {
      return dataSources.movie.recommendations({ id, page });
    },
  },
};

module.exports = { typeDefs, resolvers };

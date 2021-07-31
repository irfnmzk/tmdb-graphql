const { gql } = require("apollo-server-core");

const typeDefs = gql`
  interface People {
    id: ID!

    adult: Boolean!
    gender: Int
    knownForDepartment: String
    name: String
    popularity: Float
    profilePath: String
  }

  type Country {
    iso31661: String!
    name: String!
  }

  type Language {
    iso6391: String!
    name: String!
  }
`;

const resolvers = {};

module.exports = {
  resolvers,
  typeDefs,
};

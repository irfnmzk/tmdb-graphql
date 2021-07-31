const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type CompanyAlternativeName {
    name: String!
    type: String
  }

  type Company {
    id: ID!

    description: String
    headquarters: String
    homepage: String
    logoPath: String
    name: String!
    originCountry: String
    parentCompany: Company

    alternativeNames: [CompanyAlternativeName!]!
  }

  type Query {
    company(id: ID!): Company
  }
`;

const resolvers = {
  Query: {
    company: async (_, { id }, { dataSources }) => {
      return dataSources.company.company({ id });
    },
  },
  Company: {
    alternativeNames: async ({ id }, _, { dataSources }) => {
      return dataSources.company.alternativeNames({ id });
    },
  },
};

module.exports = {
  resolvers,
  typeDefs,
};

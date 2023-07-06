const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Weather {
    temperature: Float
    conditions: String
  }
  
  type Outfit {
    top: String
    bottom: String
    shoes: String
  }
  
  type Query {
    getOutfit(city: String!): Outfit
  }
`;

module.exports = typeDefs;
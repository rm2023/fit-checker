const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String
  }

  type Outfit {
    top: String
    bottom: String
    shoes: String
    temperature: Float
    conditions: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    getOutfit(city: String!): Outfit
    users: [User]!
    user(_id: ID): User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    removeUser(
      userId: ID!
    ): User
    login(
      email: String!
      password: String!
    ): User
  }
`;

module.exports = typeDefs;
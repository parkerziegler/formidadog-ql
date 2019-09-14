"use strict";

const { makeExecutableSchema } = require("graphql-tools");
const { incrementDogAttribute, incrementAll } = require("./helpers");

const typeDefs = `
  type Query {
    dogs: [Dog!]!
    dog(key: ID!): Dog!
  }

  type Mutation {
    likeDog(key: ID!): Dog!
    likeAllDogs: [Dog!]!
    patDog(key: ID!): Dog!
    patAllDogs: [Dog!]!
    treatDog(key: ID!): Dog!
    treatAllDogs: [Dog!]!
    bellyscratchDog(key: ID!): Dog!
    bellyscratchAllDogs: [Dog!]!
  }
  
  type Dog {
    key: String!
    name: String!
    breed: String!
    color: String!
    imageUrl: String!
    description: String!
    likes: Int!
    pats: Int!
    treats: Int!
    bellyscratches: Int!
  }
`;

const resolvers = dogs => ({
  Query: {
    dogs: () => dogs,
    dog: (_, args) => dogs.find(a => a.key === args.key)
  },
  Mutation: {
    likeDog: (_, args) => incrementDogAttribute("likes", args, dogs),
    likeAllDogs: () => incrementAll("likes", dogs),
    patDog: (_, args) => incrementDogAttribute("pats", args, dogs),
    patAllDogs: () => incrementAll("pats", dogs),
    treatDog: (_, args) => incrementDogAttribute("treats", args, dogs),
    treatAllDogs: () => incrementAll("treats", dogs),
    bellyscratchDog: (_, args) =>
      incrementDogAttribute("bellyscratches", args, dogs),
    bellyscratchAllDogs: () => incrementAll("bellyscratches", dogs)
  }
});

module.exports = {
  schema: dogs =>
    makeExecutableSchema({
      typeDefs,
      resolvers: resolvers(dogs)
    })
};

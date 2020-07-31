"use strict";

const { makeExecutableSchema } = require("graphql-tools");
const { incrementDogAttribute, incrementAll } = require("./helpers");

const typeDefs = `
  type Query {
    dogs: [Dog!]!
    dog(key: ID!): Dog!
  }

  type Mutation {
    likeDog(key: ID!, name: String): Dog!
    likeAllDogs: [Dog!]!
    patDog(key: ID!, name: String): Dog!
    patAllDogs: [Dog!]!
    treatDog(key: ID!, name: String): Dog!
    treatAllDogs: [Dog!]!
    bellyscratchDog(key: ID!, name: String): Dog!
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

const resolvers = (dogs) => ({
  Query: {
    dogs: () => dogs,
    dog: (_, args) =>
      dogs.find((d) => d.key === args.key || d.name === args.name),
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
    bellyscratchAllDogs: () => incrementAll("bellyscratches", dogs),
  },
});

module.exports = {
  schema: (dogs) =>
    makeExecutableSchema({
      typeDefs,
      resolvers: resolvers(dogs),
    }),
};

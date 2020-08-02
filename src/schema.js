"use strict";

const { makeExecutableSchema } = require("@graphql-tools/schema");

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
    likeDog: async (_, args) =>
      await incrementDogAttribute("likes", args, dogs),
    likeAllDogs: async () => await incrementAll("likes", dogs),
    patDog: async (_, args) => await incrementDogAttribute("pats", args, dogs),
    patAllDogs: async () => await incrementAll("pats", dogs),
    treatDog: async (_, args) =>
      await incrementDogAttribute("treats", args, dogs),
    treatAllDogs: async () => await incrementAll("treats", dogs),
    bellyscratchDog: async (_, args) =>
      await incrementDogAttribute("bellyscratches", args, dogs),
    bellyscratchAllDogs: async () => await incrementAll("bellyscratches", dogs),
  },
});

module.exports = {
  schema: (dogs) =>
    makeExecutableSchema({
      typeDefs,
      resolvers: resolvers(dogs),
    }),
};

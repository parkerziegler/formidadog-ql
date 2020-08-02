"use strict";

const { graphql } = require("graphql");
const fetch = require("isomorphic-fetch");
require("dotenv").config();

const { schema } = require("../src/schema");

describe("formidadog-ql server", () => {
  /**
   * Fetch dogs from dogs.formidable.dev since our schema initalization
   * requires that they be available at runtime. The JSON file is small
   * enough that it shouldn't impact test time too drastically.
   */
  let dogs;
  beforeAll(async () => {
    const res = await fetch("https://dogs.formidable.dev/dogs");
    const data = await res.json();
    dogs = data.map((dog) => ({
      ...dog,
      likes: 0,
      pats: 0,
      treats: 0,
      bellyscratches: 0,
    }));
  });

  it("executes the dogs query", async () => {
    const query = `
      query dogs {
        dogs {
          key
          name
          breed
          color
          imageUrl
          description
          likes
        }
      }
    `;

    const result = await graphql(schema(dogs), query);
    expect(result).toMatchSnapshot();
  });

  it("executes the dog query", async () => {
    const query = `
      query dog($key: ID!) {
        dog(key: $key) {
          breed
          name
        }
      }
    `;

    const result = await graphql(schema(dogs), query, undefined, undefined, {
      key: "VmeRTX7j-",
    });

    expect(result).toMatchSnapshot();
    expect(result.data.dog.name).toEqual("Dixie");
  });

  it("executes the likeDog mutation", async () => {
    const mutation = `
      mutation likeDog($key: ID!) {
        likeDog(key: $key) {
          likes
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation, undefined, undefined, {
      key: "VmeRTX7j-",
    });

    expect(result).toMatchSnapshot();
    expect(result.data.likeDog.likes).toEqual(1);
  });

  it("executes the likeAllDogs mutation", async () => {
    const mutation = `
      mutation likeAllDogs {
        likeAllDogs {
          likes
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation);

    expect(result).toMatchSnapshot();
    expect(result.data.likeAllDogs.every((dog) => dog.likes > 0)).toBe(true);
  });

  it("executes the patDog mutation", async () => {
    const mutation = `
      mutation patDog($key: ID!) {
        patDog(key: $key) {
          pats
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation, undefined, undefined, {
      key: "VmeRTX7j-",
    });

    expect(result).toMatchSnapshot();
    expect(result.data.patDog.pats).toEqual(1);
  });

  it("executes the patAllDogs mutation", async () => {
    const mutation = `
      mutation patAllDogs {
        patAllDogs {
          pats
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation);

    expect(result).toMatchSnapshot();
    expect(result.data.patAllDogs.every((dog) => dog.pats > 0)).toBe(true);
  });

  it("executes the treatDog mutation", async () => {
    const mutation = `
      mutation treatDog($key: ID!) {
        treatDog(key: $key) {
          treats
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation, undefined, undefined, {
      key: "VmeRTX7j-",
    });

    expect(result).toMatchSnapshot();
    expect(result.data.treatDog.treats).toEqual(1);
  });

  it("executes the treatAllDogs mutation", async () => {
    const mutation = `
      mutation treatAllDogs {
        treatAllDogs {
          treats
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation);

    expect(result).toMatchSnapshot();
    expect(result.data.treatAllDogs.every((dog) => dog.treats > 0)).toBe(true);
  });

  it("executes the bellyscratchDog mutation", async () => {
    const mutation = `
      mutation bellyscratchDog($key: ID!) {
        bellyscratchDog(key: $key) {
          bellyscratches
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation, undefined, undefined, {
      key: "VmeRTX7j-",
    });

    expect(result).toMatchSnapshot();
    expect(result.data.bellyscratchDog.bellyscratches).toEqual(1);
  });

  it("executes the bellyscratchAllDogs mutation", async () => {
    const mutation = `
      mutation bellyscratchAllDogs {
        bellyscratchAllDogs {
          bellyscratches
        }
      }
    `;

    const result = await graphql(schema(dogs), mutation);

    expect(result).toMatchSnapshot();
    expect(
      result.data.bellyscratchAllDogs.every((dog) => dog.bellyscratches > 0)
    ).toBe(true);
  });
});

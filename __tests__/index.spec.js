"use strict";

const { graphql } = require("graphql");
const fetch = require("isomorphic-fetch");
require("es6-promise").polyfill();
const { schema } = require("../src/schema");

describe("formidadog-ql server", () => {
  // fetch dogs from endpoint, since our schema initalization requires
  // that they be available at runtime. it's small enough that it shouldn't
  // impact test time too much
  let dogs;
  beforeAll(async () => {
    const res = await fetch("https://rawgit.com/FormidableLabs/dogs/master/dogs.json");
    const data = await res.json();
    dogs = data.map((dog) => ({ ...dog,
      likes: 0 }));
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

    const result = await graphql(
      schema(dogs),
      query
    );

    expect(result).toMatchSnapshot();
  });
});

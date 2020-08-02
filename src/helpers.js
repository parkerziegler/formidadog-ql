"use strict";

const fetch = require("isomorphic-fetch");
require("dotenv").config();

/**
 * A function to persist data updates to our JSON bin.
 * @param {*} dogs - the array of Formidable dogs.
 */
async function updateBin(dogs) {
  await fetch(process.env.BIN_API, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "secret-key": process.env.BIN_SECRET_KEY,
      versioning: false,
    },
    body: JSON.stringify(dogs, null, 2),
  });
}

/**
 * A function to increment a specific attribute on a dog.
 * @param {string} attr - the attribute to increment, i.e. likes, treats, etc.
 * @param {object} args - the arguments provided to the GraphQL mutation.
 * @param {array} dogs - the array of Formidable dogs.
 *
 * @returns {object} - the updated record created by the mutation.
 */
async function incrementDogAttribute(attr, args, dogs) {
  const dog = dogs.find((d) => d.key === args.key || d.name === args.name);
  const idx = dogs.indexOf(dog);

  const update = {
    ...dog,
    [attr]: dog[attr] + 1,
  };

  dogs.splice(idx, 1, update);

  try {
    await updateBin(dogs);

    return update;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * A function to increment a specific attribute for all dogs.
 * @param {string} attr - the attribute to increment, i.e. likes, treats, etc.
 * @param {array} dogs - the array of Formidable dogs.
 *
 * @returns {array} - the updated array of dogs created by the mutation.
 */
async function incrementAll(attr, dogs) {
  dogs.forEach((dog) => {
    dog[attr] += 1;
  });

  try {
    await updateBin(dogs);

    return dogs;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  incrementDogAttribute,
  incrementAll,
};

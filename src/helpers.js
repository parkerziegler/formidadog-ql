"use strict";

/**
 * A function to increment a specific attribute on a dog.
 * @param {string} attr - the attribute to increment, i.e. likes, treats, etc.
 * @param {object} args - the arguments provided to the GraphQL mutation.
 * @param {array} dogs - the array of Formidable dogs.
 *
 * @returns {object} - the updated record created by the mutation.
 */
const incrementDogAttribute = function(attr, args, dogs) {
  const dog = dogs.find(a => a.key === args.key);
  const idx = dogs.indexOf(dog);

  const update = {
    ...dog,
    [attr]: dog[attr] + 1
  };

  dogs.splice(idx, 1, update);
  return update;
};

/**
 * A function to increment a specific attribute for all dogs.
 * @param {string} attr - the attribute to increment, i.e. likes, treats, etc.
 * @param {array} dogs - the array of Formidable dogs.
 *
 * @returns {array} - the updated array of dogs created by the mutation.
 */
const incrementAll = function(attr, dogs) {
  dogs.forEach(dog => {
    dog[attr] += 1;
  });

  return dogs;
};

module.exports = {
  incrementDogAttribute,
  incrementAll
};

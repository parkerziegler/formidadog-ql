"use strict";

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const fetch = require("isomorphic-fetch");

const { schema } = require("./schema");

const app = express();

const start = async () => {
  const res = await fetch("https://dogs.formidable.dev/dogs");

  const data = await res.json();
  const dogs = data.map((dog) => ({
    ...dog,
    likes: 0,
    pats: 0,
    treats: 0,
    bellyscratches: 0,
  }));

  app.use(
    "/graphql",
    graphqlHTTP({
      // GraphQL’s data schema
      schema: schema(dogs),
      // Pretty Print the JSON response
      pretty: true,
      // Enable GraphiQL dev tool
      graphiql: true,
    })
  );

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

start();

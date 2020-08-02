const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const serverless = require("serverless-http");
const fetch = require("isomorphic-fetch");
const cors = require("cors");
require("dotenv").config();

const { schema } = require("../schema");

const app = express();
app.use(cors());
app.use(bodyParser.json());

module.exports.handler = async (event, context) => {
  const res = await fetch(`${process.env.BIN_API}/latest`, {
    headers: {
      "secret-key": process.env.BIN_SECRET_KEY,
    },
  });
  const dogs = await res.json();

  app.use(
    graphqlHTTP({
      // GraphQL’s data schema
      schema: schema(dogs),
      // Pretty Print the JSON response
      pretty: true,
      // Enable GraphiQL dev tool
      graphiql: true,
    })
  );

  const handler = serverless(app);

  return handler(event, context);
};

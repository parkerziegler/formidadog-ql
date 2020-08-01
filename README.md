# 🐶 formidadog-ql 🐶

A dead simple GraphQL API of 🐶 [@FormidableLabs](https://github.com/FormidableLabs). See the demo [here](https://formidadog-ql.now.sh/graphql).

[![Build Status](https://travis-ci.org/parkerziegler/formidadog-ql.svg?branch=main)](https://travis-ci.org/parkerziegler/formidadog-ql)
[![Coverage Status](https://coveralls.io/repos/github/parkerziegler/formidadog-ql/badge.svg?branch=main)](https://coveralls.io/github/parkerziegler/formidadog-ql?branch=main)

## What's This About

Everyone needs a good, simple GraphQL API for making demo apps. Everyone could use more dog photos in their life. And everyone is probably dying to meet the pups of the awesome team at Formidable. To that end, we present `formidadog-ql`.

## Get Me Running!

You know the drill. Clone the repo locally, `yarn`, `yarn start`.

```sh
git clone https://github.com/parkerziegler/formidadog-ql.git
cd formidadog-ql
yarn
yarn start
```

This will start the server up at `localhost:3001`. Go ahead and change the port in `src/index.js` if you like. We figured you might be using `localhost:3000` already 😉.

**Note: Running this app locally requires Node 8. We make use of `async`/`await` for startup, so make sure you're using Node 8 or above. Using [LTS](https://nodejs.org/en/) is recommended.**

## What Next?

Once you have the server running, go to `localhost:3001` in your browser. You'll get an awesome [GraphiQL](https://github.com/graphql/graphiql) interface for writing `queries`, `mutations`, and exploring the `schema`.

![formidadog-ql-demo](/static/formidadog-ql.gif)

As long as you have the server running, you can hit `localhost:3001` from any local app to use this API.

### Write a Simple Query

If you're not familiar with the basics of [GraphQL](https://graphql.org/), go ahead and check out [How to GraphQL](https://www.howtographql.com/) for tutorials and an overview. Let's write a simple query to get information on all the dogs at Formidable.

```
query dogs {
  dogs {
    name
    breed
    description
    imageUrl
    likes
  }
}
```

To obtain information on a single dog, use the `dog` query, which accepts a `key` variable to identify the dog. `key` is a required `ID` type in our GraphQL schema.

```
query dog($key: ID!) {
  dog(key: $key) {
    name
    breed
    likes
  }
}
```

You can use GraphiQL's `variables` editor to add the `$key` variable to the above query.

```
{
  "key": "VmeRTX7j-"
}
```

### Write a Simple Mutation

To see what mutations are currently available on the API, use the `Mutation` explorer in `GraphiQL`. Let's execute a mutation to like one of these pooches!

```
mutation likeDog($key: ID!) {
  likeDog(key: $key) {
    name
    likes
  }
}
```

Each time we execute this mutation, we should see the mutated dog's `likes` increment by one.

## How You Can Help

This API is not fully formed yet. There's plenty of great `queries`, `mutations`, and `subscriptions` left to be added. Go ahead and [open a PR](https://github.com/parkerziegler/formidadog-ql/pulls)! If you find a bug, please [file an issue](https://github.com/parkerziegler/formidadog-ql/issues).

# formidadog-ql
A dead simple GraphQL API of dogs @ Formidable (FormidableLabs).

## What's This About
Everyone needs a good, simple GraphQL API for making demo apps. Everyone could use more dog photos in their life. And everyone is probably dying to meet the pups that work with me and my wonderful colleagues at Formidable. To that end, here's `formidadog-ql`.

## Get Me Running!
You know the drill. Clone the repo locally, `yarn`, `yarn run start`.

```sh
git clone https://github.com/parkerziegler/formidadog-ql.git
cd formidadog-ql
yarn
yarn run start
```

This will start the server up at `localhost:3001`. Go ahead and change the port in `src/server/index.js` if you like. We figured you might be using `localhost:3000` already 😉.

## What Next?
Once you have the server running, go to `localhost:3001` in your browser. You'll get an awesome [GraphiQL](https://github.com/graphql/graphiql) interface for writing `queries`, `mutations`, and exploring the `schema`.

![formidadog-ql-demo](/static/formidadog-ql.gif)

As long as you have the server running, you can hit `localhost:3001` from any local app to use this API. Let us know what you create!
# Roads Module

Write a CommonJS module, based on the example from Chapter 7, that
contains the array of roads and exports the graph data structure representing them as `roadGraph`. It should depend on a module `./graph`, which exports a function `buildGraph` that is used to build the graph. This function expects
an array of two-element arrays (the start and end points of the roads).

## Exercise Hints

Since this is a CommonJS module, you have to use `require` to import the
graph module. That was described as exporting a `buildGraph` function,
which you can pick out of its interface object with a destructuring const
declaration.

To export `roadGraph`, you add a property to the `exports` object. Because
`buildGraph` takes a data structure that doesn’t precisely match `roads`, the splitting of the road strings must happen in your module.

# Script Notes - modified template based on [simple-typescript-starter](https://github.com/stemmlerjs/simple-typescript-starter)

## 🧰 Simple TypeScript Starter | 2022

> We talk about a lot of **advanced Node.js and TypeScript** concepts on [the blog](https://khalilstemmler.com), particularly focused around Domain-Driven Design and large-scale enterprise application patterns. However, I received a few emails from readers that were interested in seeing what a basic TypeScript starter project looks like. So I've put together just that.

### Features

- Minimal
- TypeScript v4
- Testing with Jest
- Local development with Nodemon

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

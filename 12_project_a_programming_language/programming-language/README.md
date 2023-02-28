# Borrowing a Method

Earlier in the chapter I mentioned that an object’s `hasOwnProperty` can be
used as a more robust alternative to the `in` operator when you want to ignore
the prototype’s properties. But what if your map needs to include the word `"hasOwnProperty"`? You won’t be able to call that method anymore because the
object’s own property hides the method value.

Can you think of a way to call `hasOwnProperty` on an object that has its own
property by that name?

## Exercise Hints

Remember that methods that exist on plain objects come from `Object.prototype`.

Also remember that you can call a function with a specific `this` binding
by using its `call` method.

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

# Comments

It would be nice if we could write comments in Egg. For example, whenever
we find a hash sign (`#`), we could treat the rest of the line as a comment and
ignore it, similar to `//` in JavaScript.

We do not have to make any big changes to the parser to support this.
We can simply change `skipSpace` to skip comments as if they are whitespace
so that all the points where `skipSpace` is called will now also skip comments.
Make this change.

## Exercise Hints

Make sure your solution handles multiple comments in a row, with potential
whitespace between or after them.

A regular expression is probably the easiest way to solve this. Write
something that matches “whitespace or a comment, zero or more times.”
Use the `exec` or `match` method and look at the length of the first element in
the returned array (the whole match) to find out how many characters to
slice off.

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

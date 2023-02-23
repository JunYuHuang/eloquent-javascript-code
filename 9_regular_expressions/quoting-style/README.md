# Quoting Style

Imagine you have written a story and used single quotation marks throughout to mark pieces of dialogue. Now you want to replace all the dialogue
quotes with double quotes, while keeping the single quotes used in contractions like `aren’t`.

Think of a pattern that distinguishes these two kinds of quote usage and
craft a call to the `replace` method that does the proper replacement.

## Exercise Hints

The most obvious solution is to replace only quotes with a nonword character on at least one side—something like `/\ W'|'\ W/`. But you also have to
take the start and end of the line into account.

In addition, you must ensure that the replacement also includes
the characters that were matched by the `\W` pattern so that those are not
dropped. This can be done by wrapping them in parentheses and including
their groups in the replacement string (`$1`, `$2`). Groups that are not matched
will be replaced by nothing.

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

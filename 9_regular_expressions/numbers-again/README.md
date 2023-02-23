# Numbers Again

Write an expression that matches only JavaScript-style numbers. It must support an optional minus _or_ plus sign in front of the number, the decimal dot,
and exponent notation— `5e-3` or `1E10` —again with an optional sign in front
of the exponent. Also note that it is not necessary for there to be digits in
front of or after the dot, but the number cannot be a dot alone. That is, `.5`
and `5.` are valid JavaScript numbers, but a lone dot _isn’t_.

## Exercise Hints

First, do not forget the backslash in front of the period.

Matching the optional sign in front of the number, as well as in front of
the exponent, can be done with `[+\-]?` or `(\+|-|)` (plus, minus, or nothing).

The more complicated part of the exercise is the problem of matching
both `"5."` and `".5"` without also matching `"."`. For this, a good solution is
to use the | operator to separate the two cases—either one or more digits
optionally followed by a dot and zero or more digits _or_ a dot followed by one
or more digits.

Finally, to make the _e_ case insensitive, either add an `i` option to the regular expression or use `[eE]`.

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

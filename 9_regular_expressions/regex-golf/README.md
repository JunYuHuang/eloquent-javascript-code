# Regexp Golf

_Code golf_ is a term used for the game of trying to express a particular program in as few characters as possible. Similarly, _regexp golf_ is the practice of
writing as tiny a regular expression as possible to match a given pattern, and
_only_ that pattern.

For each of the following items, write a regular expression to test
whether any of the given substrings occur in a string. The regular expression should match only strings containing one of the substrings described.
Do not worry about word boundaries unless explicitly mentioned. When
your expression works, see whether you can make it any smaller.

1. _car_ and _cat_
2. _pop_ and _prop_
3. _ferret_, _ferry_, and _ferrari_
4. Any word ending in _ious_
5. A whitespace character followed by a period, comma, colon, or
semicolon
6. A word longer than six letters
7. A word without the letter _e_ (or _E_)

Refer to the table in the chapter summary for help. Test each solution
with a few test strings.

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

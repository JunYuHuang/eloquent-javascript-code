# Dominant Writing Direction

Write a function that computes the dominant writing direction in a string of
text. Remember that each script object has a `direction` property that can be
`"ltr"` (left to right), `"rtl"` (right to left), or `"ttb"` (top to bottom).

The dominant direction is the direction of a majority of the characters
that have a script associated with them. The `characterScript` and `countBy` functions defined earlier in the chapter are probably useful here.

## Exercise Hints

Your solution might look a lot like the first half of the `textScripts` example.
You again have to count characters by a criterion based on `characterScript`
and then filter out the part of the result that refers to uninteresting (scriptless) characters.

Finding the direction with the highest character count can be done
with `reduce`. If it’s not clear how, refer to the example earlier in the chapter,
where `reduce` was used to find the script with the most characters.

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

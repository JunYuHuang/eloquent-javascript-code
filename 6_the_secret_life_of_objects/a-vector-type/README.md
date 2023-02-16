# A Vector Type

Write a class `Vec` that represents a vector in two-dimensional space. It takes
`x` and `y` parameters (numbers), which it should save to properties of the
same name.

Give the `Vec` prototype two methods, `plus` and `minus`, that take another
vector as a parameter and return a new vector that has the sum or difference
of the two vectors’ (`this` and the parameter) _x_ and _y_ values.

Add a getter property `length` to the prototype that computes the length
of the vector—that is, the distance of the point (_x_, _y_) from the origin (_0_, _0_).

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

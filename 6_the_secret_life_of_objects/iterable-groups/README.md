# Iterable Groups

Make the `Group` class from the previous exercise iterable. Refer to the section
about the iterator interface earlier in the chapter if you aren’t clear on the
exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return
the iterator created by calling the `Symbol.iterator` method on the array. That
would work, but it defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified
during iteration.

## Exercise Hints

It is probably worthwhile to define a new class `GroupIterator`. Iterator
instances should have a property that tracks the current position in the
group. Every time `next` is called, it checks whether it is done and, if not,
moves past the current value and returns it.

The `Group` class itself gets a method named by `Symbol.iterator` that, when
called, returns a new instance of the iterator class for that group.

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

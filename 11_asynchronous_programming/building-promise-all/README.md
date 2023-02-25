# Building Promise.all

Given an array of promises, `Promise.all` returns a promise that waits for all
of the promises in the array to finish. It then succeeds, yielding an array of
result values. If a promise in the array fails, the promise returned by `all fails
too, with the failure reason from the failing promise.

Implement something like this yourself as a regular function called
`Promise_all`.

Remember that after a promise has succeeded or failed, it can’t succeed
or fail again, and further calls to the functions that resolve it are ignored.
This can simplify the way you handle failure of your promise.

## Exercise Hints

The function passed to the `Promise` constructor will have to call `then` on each
of the promises in the given array. When one of them succeeds, two things
need to happen. The resulting value needs to be stored in the correct position of a result array, and we must check whether this was the last pending
promise and finish our own promise if it was.

The latter can be done with a counter that is initialized to the length of
the input array and from which we subtract 1 every time a promise succeeds.
When it reaches 0, we are done. Make sure you take into account the situation where the input array is empty (and thus no promise will ever `resolve`).

Handling failure requires some thought but turns out to be extremely
simple. Just pass the `reject` function of the wrapping promise to each of the
promises in the array as a `catch` handler or as a second argument to `then` so
that a failure in one of them triggers the rejection of the whole wrapper
promise.

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

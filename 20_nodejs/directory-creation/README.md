# Directory Creation

Though the `DELETE` method in our file server is able to delete directories
(using `rmdir`), the server currently does not provide any way to _create_ a
directory.

Add support for the `MKCOL` method (“make column”), which should
create a directory by calling `mkdir` from the `fs` module. `MKCOL` is not a widely
used HTTP method, but it does exist for this same purpose in the _WebDAV_
standard, which specifies a set of conventions on top of HTTP that make it
suitable for creating documents.

## Exercise Hints

You can use the function that implements the `DELETE` method as a blueprint
for the `MKCOL` method. When no file is found, try to create a directory with
`mkdir`. When a directory exists at that path, you can return a 204 response so
that directory creation requests are idempotent. If a nondirectory file exists
here, return an error code. Code 400 (“bad request”) would be appropriate.

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

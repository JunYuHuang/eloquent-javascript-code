# Persistent Group

Most data structures provided in a standard JavaScript environment aren’t
very well suited for persistent use. Arrays have `slice` and `concat` methods,
which allow us to easily create new arrays without damaging the old one. But
`Set`, for example, has no methods for creating a new set with an item added
or removed.

Write a new class `PGroup`, similar to the `Group` class from “Groups” on
page 113, which stores a set of values. Like `Group`, it has `add`, `delete`, and `has` methods.

Its `add` method, however, should return a _new_ `PGroup` instance with the
given member added and leave the old one unchanged. Similarly, `delete` creates a new instance without a given member.

The class should work for values of any type, not just strings. It does _not_
have to be efficient when used with large amounts of values.

The constructor shouldn’t be part of the class’s interface (though you’ll
definitely want to use it internally). Instead, there is an empty instance,
`PGroup.empty`, that can be used as a starting value.

Why do you need only one `PGroup.empty` value, rather than having a function that creates a new, empty map every time?

## Exercise Hints

The most convenient way to represent the set of member values is still as an
array since arrays are easy to copy.

When a value is added to the group, you can create a new group with
a copy of the original array that has the value added (for example, using
concat ). When a value is deleted, you filter it from the array.

The class’s constructor can take such an array as argument and store it
as the instance’s (only) property. This array is never updated.

To add a property (`empty`) to a constructor that is not a method, you
have to add it to the constructor after the class definition, as a regular
property.

You need only one `empty` instance because all empty groups are the
same and instances of the class don’t change. You can create many different groups from that single empty group without affecting it.

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

# Fixing Scope

Currently, the only way to assign a binding a value is `define`. This construct
acts as a way both to define new bindings and to give existing ones a new
value.

This ambiguity causes a problem. When you try to give a nonlocal binding a new value, you will end up defining a local one with the same name
instead. Some languages work like this by design, but I’ve always found it an
awkward way to handle scope.

Add a special form `set`, similar to `define`, which gives a binding a new
value, updating the binding in an outer scope if it doesn’t already exist in
the inner scope. If the binding is not defined at all, throw a `ReferenceError`
(another standard error type).

The technique of representing scopes as simple objects, which has made
things convenient so far, will get in your way a little at this point. You might
want to use the `Object.getPrototypeOf` function, which returns the prototype
of an object. Also remember that scopes do not derive from `Object.prototype`,
so if you want to call `hasOwnProperty` on them, you have to use this clumsy
expression:

```js
Object.prototype.hasOwnProperty.call(scope, name);
```

## Exercise Hints

You will have to loop through one scope at a time, using `Object.getPrototypeOf`
to go to the next outer scope. For each scope, use `hasOwnProperty` to find out
whether the binding, indicated by the `name` property of the first argument to
`set` , exists in that scope. If it does, set it to the result of evaluating the second
argument to set and then return that value.

If the outermost scope is reached (`Object.getPrototypeOf` returns null)
and we haven’t found the binding yet, it doesn’t exist, and an error should
be thrown.

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

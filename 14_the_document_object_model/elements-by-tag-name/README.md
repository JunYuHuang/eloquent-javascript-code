# Elements by Tag Name

The `document.getElementsByTagName` method returns all child elements with a
given tag name. Implement your own version of this as a function that takes
a node and a string (the tag name) as arguments and returns an array containing all descendant element nodes with the given tag name.

To find the tag name of an element, use its `nodeName` property. But note
that this will return the tag name in all uppercase. Use the `toLowerCase` or
`toUpperCase` string methods to compensate for this.

## Exercise Hints

The solution is most easily expressed with a recursive function, similar to the
`talksAbout` function defined earlier in this chapter.

You could call `byTagname` itself recursively, concatenating the resulting
arrays to produce the output. Or you could create an inner function that
calls itself recursively and that has access to an array binding defined in the
outer function, to which it can add the matching elements it finds. Don’t
forget to call the inner function once from the outer function to start the
process.

The recursive function must check the node type. Here we are interested only in node type 1 (`Node.ELEMENT_NODE`). For such nodes, we must loop
over their children and, for each child, see whether the child matches the
query while also doing a recursive call on it to inspect its own children.

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

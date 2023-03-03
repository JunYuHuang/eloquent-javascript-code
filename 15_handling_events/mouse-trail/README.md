# Mouse Trail

In JavaScript’s early days, which was the high time of gaudy home pages with
lots of animated images, people came up with some truly inspiring ways to
use the language.

One of these was the _mouse trail_—a series of elements that would follow
the mouse pointer as you moved it across the page.

In this exercise, I want you to implement a mouse trail. Use absolutely
positioned `<div>` elements with a fixed size and background color (refer to
the code in “Mouse Clicks” on page 253 for an example). Create a bunch of
such elements and, when the mouse moves, display them in the wake of the
mouse pointer.

There are various possible approaches here. You can make your solution as simple or as complex as you want. A simple solution to start with is
to keep a fixed number of trail elements and cycle through them, moving
the next one to the mouse’s current position every time a `"mousemove"` event
occurs.

## Exercise Hints

Creating the elements is best done with a loop. Append them to the document to make them show up. To be able to access them later to change their
position, you’ll want to store the elements in an array.

Cycling through them can be done by keeping a counter variable and
adding 1 to it every time the `"mousemove"` event fires. The remainder operator
(`% elements.length`) can then be used to get a valid array index to pick the
element you want to position during a given event.

Another interesting effect can be achieved by modeling a simple physics
system. Use the `"mousemove"` event only to update a pair of bindings that track
the mouse position. Then use `requestAnimationFrame` to simulate the trailing
elements being attracted to the position of the mouse pointer. At every animation step, update their position based on their position relative to the
pointer (and, optionally, a speed that is stored for each element). Figuring
out a good way to do this is up to you.

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

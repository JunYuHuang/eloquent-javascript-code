# The Cat's Hat

Extend the cat animation defined in “Positioning and Animating” on
page 240 so that both the cat and his hat (`<img src="img/hat.png">`) orbit at
opposite sides of the ellipse.

Or make the hat circle around the cat. Or alter the animation in some
other interesting way.

To make positioning multiple objects easier, it is probably a good idea
to switch to absolute positioning. This means that `top` and `left` are counted
relative to the top left of the document. To avoid using negative coordinates,
which would cause the image to move outside of the visible page, you can
add a fixed number of pixels to the position values.

## Exercise Hints

`Math.cos` and `Math.sin` measure angles in radians, where a full circle is 2π. For
a given angle, you can get the opposite angle by adding half of this, which
is `Math.PI`. This can be useful for putting the hat on the opposite side of the
orbit.

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

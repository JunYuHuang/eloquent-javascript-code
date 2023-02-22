# Robot Efficiency

Can you write a robot that finishes the task faster than `goalOrientedRobot`? If
you observe that robot’s behavior, what obviously stupid things does it do?
How could those be improved?

If you solved the previous exercise, you might want to use your
`compareRobots` function to verify whether you improved the robot.

## Exercise Hints

The main limitation of `goalOrientedRobot` is that it considers only one parcel
at a time. It will often walk back and forth across the village because the parcel it happens to be looking at happens to be at the other side of the map,
even if there are others much closer.

One possible solution would be to compute routes for all packages and
then take the shortest one. Even better results can be obtained, if there are
multiple shortest routes, by preferring the ones that go to pick up a package
instead of delivering a package.

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

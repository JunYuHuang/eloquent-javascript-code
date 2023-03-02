# Build a Table

An HTML table is built with the following tag structure:

```html
<table>
    <tr>
        <th>name</th>
        <th>height</th>
        <th>place</th>
    </tr>
    <tr>
        <td>Kilimanjaro</td>
        <td>5895</td>
        <td>Tanzania</td>
    </tr>
</table>
```

For each _row_, the `<table>` tag contains a `<tr>` tag. Inside of these `<tr>` tags,
we can put cell elements: either heading cells (`<th>`) or regular cells (`<td>`).

Given a data set of mountains, an array of objects with `name`, `height`, and
`place` properties, generate the DOM structure for a table that enumerates
the objects. It should have one column per key and one row per object, plus
a header row with `<th>` elements at the top, listing the column names.

Write this so that the columns are automatically derived from the
objects, by taking the property names of the first object in the data.

Add the resulting table to the element with an `id` attribute of `"mountains"`
so that it becomes visible in the document.

Once you have this working, right-align cells that contain number values
by setting their `style.textAlign` property to `"right"`.

## Exercise Hints

You can use `document.createElement` to create new element nodes, `document.createTextNode` to create text nodes, and the `appendChild` method to put
nodes into other nodes.

You’ll want to loop over the key names once to fill in the top row and
then again for each object in the array to construct the data rows. To get an
array of key names from the first object, `Object.keys` will be useful.

To add the table to the correct parent node, you can use `document.getElementById` or `document.querySelector` to find the node with the proper
`id` attribute.

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

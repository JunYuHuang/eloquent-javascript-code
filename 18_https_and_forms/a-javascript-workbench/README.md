# A JavaScript Workbench

Build an interface that allows people to type and run pieces of JavaScript
code.

Put a button next to a `<textarea>` field that, when pressed, uses the
`Function` constructor we saw in “Evaluating Data as Code” on page 170 to
wrap the text in a function and call it. Convert the return value of the function, or any error it raises, to a string and display it below the text field.

## Exercise Hints

Use `document.querySelector` or `document.getElementById` to get access to the elements defined in your HTML. An event handler for `"click"` or `"mousedown"`
events on the button can get the value property of the text field and call
`Function` on it.

Make sure you wrap both the call to `Function` and the call to its result in a
`try` block so you can catch the exceptions it produces. In this case, we really
don’t know what type of exception we are looking for, so catch everything.

The `textContent` property of the output element can be used to fill it with
a string message. Or, if you want to keep the old content around, create a
new text node using `document.createTextNode` and append it to the element.
Remember to add a newline character to the end so that not all output
appears on a single line.

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

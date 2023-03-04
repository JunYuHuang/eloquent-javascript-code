# Tabs

Tabbed panels are widely used in user interfaces. They allow you to select an
interface panel by choosing from a number of tabs “sticking out” above an
element.

In this exercise you must implement a simple tabbed interface. Write
a function, `asTabs`, that takes a DOM node and creates a tabbed interface
showing the child elements of that node. It should insert a list of `<button>`
elements at the top of the node, one for each child element, containing text
retrieved from the `data-tabname` attribute of the child. All but one of the original children should be hidden (given a `display` style of `none`). The currently
visible node can be selected by clicking the buttons.

When that works, extend it to style the button for the currently selected
tab differently so that it is obvious which tab is selected.

## Exercise Hints

One pitfall you might run into is that you can’t directly use the node’s
`childNodes` property as a collection of tab nodes. For one thing, when you
add the buttons, they will also become child nodes and end up in this object
because it is a live data structure. For another, the text nodes created for the
whitespace between the nodes are also in `childNodes` but should not get their
own tabs. You can use `children` instead of `childNodes` to ignore text nodes.

You could start by building up an array of tabs so that you have easy
access to them. To implement the styling of the buttons, you could store
objects that contain both the tab panel and its button.

I recommend writing a separate function for changing tabs. You can
either store the previously selected tab and change only the styles needed to
hide that and show the new one, or you can just update the style of all tabs
every time a new tab is selected.

You might want to call this function immediately to make the interface
start with the first tab visible.

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

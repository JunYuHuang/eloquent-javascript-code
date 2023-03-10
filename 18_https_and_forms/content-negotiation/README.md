# Content Negotiation

One of the things HTTP can do is called _content negotiation_. The `Accept`
request header is used to tell the server what type of document the client
would like to get. Many servers ignore this header, but when a server knows
of various ways to encode a resource, it can look at this header and send the
one that the client prefers.

The URL `https://eloquentjavascript.net/author` is configured to respond
with either plaintext, HTML, or JSON, depending on what the client asks
for. These formats are identified by the standardized _media types_ `text/plain`,
`text/html`, and `application/json`.

Send requests to fetch all three formats of this resource. Use the `headers`
property in the options object passed to `fetch` to set the header named `Accept`
to the desired media type.

Finally, try asking for the media type `application/rainbows+unicorns` and
see which status code that produces.

## Exercise Hints

Base your code on the `fetch` examples in “Fetch” on page 315.

Asking for a bogus media type will return a response with code 406, “Not
acceptable,” which is the code a server should return when it can’t fulfill the
`Accept` header.

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

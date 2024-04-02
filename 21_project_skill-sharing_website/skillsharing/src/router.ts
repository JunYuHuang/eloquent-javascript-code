// ROUTING

/*
Our server will use Node’s `createServer` to start an HTTP server. In the function that handles a new request, we must distinguish between the various kinds of requests (as determined by the method and the path) that we support. This can be done with a long chain of `if` statements, but there is a nicer way.

A router is a component that helps dispatch a request to the function that can handle it. You can tell the router, for example, that `PUT` requests with a path that matches the regular expression `/^\/talks\/([^\/]+)$/` (`/talks/` followed by a talk title) can be handled by a given function. In addition, it can help extract the meaningful parts of the path (in this case the talk title), wrapped in parentheses in the regular expression, and pass them to the handler function.

There are a number of good router packages on NPM, but here we’ll write one ourselves to illustrate the principle.

This is `router.mjs`, which we will later import from our server module:

The module exports the `Router` class. A router object allows you to register handlers for specific methods and URL patterns with its add method. When a request is resolved with the `resolve` method, the router calls the handler whose method and URL match the request and return its result.

Handler functions are called with the context value given to `resolve. We will use this to give them access to our server state. Additionally, they receive the match strings for any groups they defined in their regular expression, and the request object. The strings have to be URL-decoded since the raw URL may contain `%20`-style codes.
*/

import { IncomingMessage, Server } from "node:http";

type httpMethodType = "GET" | "PUT" | "POST" | "DELETE";
type handlerType = (...args: any[]) => any;
interface routeInterface {
  method: httpMethodType;
  url: RegExp;
  handler: handlerType;
}

export class Router {
  routes: routeInterface[];

  constructor() {
    this.routes = [];
  }

  add(method: httpMethodType, url: RegExp, handler: handlerType) {
    this.routes.push({ method, url, handler });
  }

  async resolve(request: IncomingMessage, context: Server) {
    let { pathname } = new URL(request.url!, "http://d");

    for (let { method, url, handler } of this.routes) {
      let match = url.exec(pathname);
      if (!match || request.method != method) continue;

      let parts = match.slice(1).map(decodeURIComponent);
      return handler(context, ...parts, request);
    }
  }
}

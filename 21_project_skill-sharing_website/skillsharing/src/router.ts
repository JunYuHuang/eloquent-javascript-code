/*
HTTP router that processes each client's request (method and action) and forwards the request to the appropriate action handler.
*/

/*
The module exports the Router class. A router object allows you to register handlers for specific methods and URL patterns with its add method. When a request is resolved with the resolve method, the router calls the handler whose method and URL match the request and return its result.

Handler functions are called with the context value given to resolve. We will use this to give them access to our server state. Additionally, they receive the match strings for any groups they defined in their regular expression, and the request object. The strings have to be URL-decoded since the raw URL may contain %20-style codes.
*/

import { IncomingMessage, Server } from "node:http";

type httpMethodType = "GET" | "PUT" | "POST" | "DELETE";
type handlerType = (...args: any[]) => any;
interface routeInterface {
  method: httpMethodType;
  url: RegExp;
  handler: handlerType;
}

// export class Router {
//   routes: routeInterface[];

//   constructor() {
//     this.routes = [];
//   }

//   add(method: httpMethodType, url: RegExp, handler: handlerType) {
//     this.routes.push({ method, url, handler });
//   }

//   async resolve(request: IncomingMessage, context: Server) {
//     let { pathname } = new URL(request.url!, "http://d");

//     for (let { method, url, handler } of this.routes) {
//       let match: null | string[] = url.exec(pathname);
//       if (!match || request.method != method) continue;

//       let parts = match.slice(1).map(decodeURIComponent);
//       return handler(context, ...parts, request);
//     }
//   }
// }

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

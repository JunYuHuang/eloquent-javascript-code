// TYPES

type commentType = {
  author: string;
  message: string;
}

type talkType = {
  title: string;
  presenter: string;
  summary: string;
  comments: commentType[]
}

type talksType = {
  [title: string]: talkType
}



// SERVING FILES

/*
When a request matches none of the request types defined in our router, the server must interpret it as a request for a file in the public directory. It would be possible to use the file server defined in Chapter 20 to serve such files, but we neither need nor want to support PUT and DELETE requests on files, and we would like to have advanced features such as support for caching. So let’s use a solid, well-tested static file server from NPM instead.

I opted for serve-static. This isn’t the only such server on NPM, but it works well and fits our purposes. The serve-static package exports a function that can be called with a root directory to produce a request handler function. The handler function accepts the request and response arguments provided by the server from "node:http", and a third argument, a function that it will call if no file matches the request. We want our server to first check for requests that we should handle specially, as defined in the router, so we wrap it in another function.
*/

import {
  IncomingMessage, Server, ServerResponse, createServer
} from "node:http";
import serveStatic from "serve-static";

function notFound(
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) {
  response.writeHead(404, "Not found");
  response.end("<h1>Not found</h1>");
}

class SkillShareServer {
  talks: talksType;
  version: number;
  waiting: any[];
  server: Server;

  updated() {
    throw new Error("Method not implemented.");
  }

  talkResponse() {
    throw new Error("Method not implemented.");
  }

  waitForChanges(time: number): any {
    throw new Error("Method not implemented.");
  }

  constructor(talks: talksType) {
    this.talks = talks;
    this.version = 0;
    this.waiting = [];

    let fileServer = serveStatic("./public");
    this.server = createServer(
      (
        request: IncomingMessage,
        response: ServerResponse<IncomingMessage>
      ) => {
        serveFromRouter(
          this,
          request,
          response,
          () => {
            fileServer(
              request,
              response,
              () => notFound(request, response)
            );
          }
        );
      }
    );
  }

  start(port: number) {
    this.server.listen(port);
  }

  stop() {
    this.server.close();
  }
}



/*
The serveFromRouter function has the same interface as fileServer, taking (request, response, next) arguments. This allows us to “chain” several request handlers, allowing each to either handle the request, or pass responsibility for that on to the next handler. The final handler, notFound, simply responds with a “not found” error.

Our serveFromRouter function uses a similar convention as the file server from the previous chapter for responses—handlers in the router return promises that resolve to objects describing the response.
*/

type genericFuncType = (...args: any[]) => any;

import { Router } from "./router";

const router = new Router();
const defaultHeaders = { "Content-Type": "text/plain" };

async function serveFromRouter(
  server: Server | any,
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
  next: genericFuncType
) {
  let resolved = await router
    .resolve(request, server)
    .catch((error) => {
      if (error.status != null) return error;
      return {
        body: String(error),
        status: 500,
      };
    });

  if (!resolved) return next();

  let {
    body, status = 200, headers = defaultHeaders
  } = await resolved;

  response.writeHead(status, headers);
  response.end(body);
}



// TALKS AS RESOURCES

/*
The talks that have been proposed are stored in the talks property of the server, an object whose property names are the talk titles. We will add some handlers to our router that expose these as HTTP resources under /talks/[title].

The handler for requests that GET a single talk must look up the talk and respond either with the talk’s JSON data or with a 404 error response.
*/

const talkPath = /^\/talks\/([^\/]+)$/;

router.add(
  "GET",
  talkPath,
  async (server: SkillShareServer, title: string) => {
    if (Object.hasOwn(server.talks, title)) {
      return {
        body: JSON.stringify(server.talks[title]),
        headers: { "Content-Type": "application/json" }
      };
    }
    return {
      status: 404,
      body: `No talk '${title}' found`,
    };
  }
);



/*
Deleting a talk is done by removing it from the talks object.

The updated method, which we will define later, notifies waiting long polling requests about the change.
*/

router.add(
  "DELETE",
  talkPath,
  async (server: SkillShareServer, title: string) => {
    if (Object.hasOwn(server.talks, title)) {
      delete server.talks[title];
      server.updated();
    }
    return { status: 204 };
  }
);



/*
One handler that needs to read request bodies is the PUT handler, which is used to create new talks. It has to check whether the data it was given has presenter and summary properties, which are strings. Any data coming from outside the system might be nonsense, and we don’t want to corrupt our internal data model or crash when bad requests come in.

If the data looks valid, the handler stores an object that represents the new talk in the talks object, possibly overwriting an existing talk with this title, and again calls updated.

To read the body from the request stream, we will use the json function from "node:stream/consumers", which collects the data in the stream and then parses it as JSON. There are similar exports called text (to read the content as a string) and buffer (to read it as binary data) in this package. Since json is a very generic name, the import renames it to readJSON to avoid confusion.
*/

import { json as readJSON } from "node:stream/consumers";

router.add(
  "PUT",
  talkPath,
  async (
    server: SkillShareServer,
    title: string,
    request: IncomingMessage
  ) => {
    let talk: talkType = await readJSON(request) as talkType;

    if (
      !talk ||
      typeof talk.presenter !== "string" ||
      typeof talk.summary !== "string"
    ) {
      return {
        status: 400,
        body: "Bad talk data"
      };
    }

    server.talks[title] = {
      title,
      presenter: talk.presenter,
      summary: talk.summary,
      comments: []
    }
    server.updated();
    return { status: 204 };
  }
);



/*
Adding a comment to a talk works similarly. We use readJSON to get the content of the request, validate the resulting data, and store it as a comment when it looks valid.
*/

const commentPath = /^\/talks\/([^\/]+)\/comments$/;

router.add(
  "POST",
  commentPath,
  async (
    server: SkillShareServer,
    title: string,
    request: IncomingMessage
  ) => {
    let comment: commentType = await readJSON(request) as commentType;

    if (
      !comment ||
      typeof comment.author !== "string" ||
      typeof comment.message !== "string"
    ) {
      return {
        status: 400,
        body: "Bad comment data"
      };
    }

    if (Object.hasOwn(server.talks, title)) {
      server.talks[title].comments.push(comment);
      server.updated();
      return { status: 204 };
    }

    return {
      status: 404,
      body: `No talk '${title}' found`
    };
  }
);



// LONG POLLING SUPPORT

/*
The most interesting aspect of the server is the part that handles long polling. When a GET request comes in for /talks, it may be either a regular request or a long polling request.

There will be multiple places in which we have to send an array of talks to the client, so we first define a helper method that builds up such an array and includes an ETag header in the response.
*/

SkillShareServer.prototype.talkResponse = function () {
  let talks = Object.keys(this.talks)
    .map((title) => this.talks[title]);

  return {
    body: JSON.stringify(talks),
    headers: {
      "Content-Type": "application/json",
      "ETag": `"${this.version}"`,
      "Cache-Control": "no-store",
    }
  };
}



/*
The handler itself needs to look at the request headers to see whether If-None-Match and Prefer headers are present. Node stores headers, whose names are specified to be case insensitive, under their lowercase names.

If no tag was given or a tag was given that doesn’t match the server’s current version, the handler responds with the list of talks. If the request is conditional and the talks did not change, we consult the Prefer header to see whether we should delay the response or respond right away.
*/

router.add(
  "GET",
  /^\/talks$/,
  async (server: SkillShareServer, request: IncomingMessage) => {
    let tag = /"(.*)"/.exec(request.headers["if-none-match"] as string);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"] as string);

    if (!tag || Number(tag[1]) !== server.version) {
      return server.talkResponse();
    }
    if (!wait) return { status: 304 };
    return server.waitForChanges(Number(wait[1]));
  }
);



/*
Callback functions for delayed requests are stored in the server’s `waiting` array so that they can be notified when something happens. The `waitForChanges` method also immediately sets a timer to respond with a 304 status when the request has waited long enough.
*/

SkillShareServer.prototype.waitForChanges = function (time: number) {
  return new Promise((resolve) => {
    this.waiting.push(resolve);

    setTimeout(() => {
      if (!this.waiting.includes(resolve)) return;

      this.waiting = this.waiting.filter((res) => res != resolve);
      resolve({ status: 304 });
    }, time * 1000);
  });
};



/*
Registering a change with updated increases the version property and wakes up all waiting requests.
*/

SkillShareServer.prototype.updated = function () {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach((resolve) => resolve(response));
  this.waiting = [];
};



/*
That concludes the server code. If we create an instance of SkillShareServer and start it on port 8000, the resulting HTTP server serves files from the public subdirectory alongside a talk-managing interface under the /talks URL.
*/

new SkillShareServer({}).start(8000);

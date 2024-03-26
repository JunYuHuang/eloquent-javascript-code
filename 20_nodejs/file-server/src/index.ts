/*
Chapter 20: Node.js - File Server

This is an HTTP server that allows remote access to a file system.
It allows web apps to store and share data or it can give people shared access to some files.
*/

import { IncomingMessage, createServer } from "node:http";

const methods = Object.create(null);

/*
Creates a server that returns a 500 status by default.
- A RESTful API for files instead of database records.
- Maps root (from `/`) file requests to their actual stored location in `/public/`. E.g., `GET /file.txt` retrieves the file stored at `/public/file.txt`.
*/
createServer((request: IncomingMessage, response) => {
  /*
  `handler` is an async function that returns a promise.
  It follows the error-first handling Node.js convention for async functions.
  */
  let handler = methods[request.method!] || notAllowed;

  handler(request)
    // handles rejected `request` promise
    .catch((error) => {
      if (error.status != null) return error;

      return {
        body: String(error),
        status: 500,
      }
    })
    // handles fulfilled `request` promise
    .then(({ body, status = 200, type = "text/plain" }) => {
      response.writeHead(status, { "Content-Type": type });

      const isReadableStream = body && body.pipe;
      if (isReadableStream) {
        /*
        Forward its content to a writable stream.
        */
        body.pipe(response);
      } else {
        /*
        `body` is null, a string or a buffer.
        */
        response.end(body);
      }
    });
}).listen(8000);

async function notAllowed(request: IncomingMessage) {
  return {
    status: 405,
    body: `Method ${request.method} not allowed.`
  }
}

/*
Gets the file path associated with a request URL.
*/
import { parse } from "node:url";
import { resolve, sep } from "node:path";

const baseDirectory = process.cwd();

/*
To avoid such problems, urlPath uses the resolve function from the node:path module, which resolves relative paths. It then verifies that the result is below the working directory. The process.cwd function (where cwd stands for “current working directory”) can be used to find this working directory. The sep binding from the node:path package is the system’s path separator—a backslash on Windows and a forward slash on most other systems. When the path doesn’t start with the base directory, the function throws an error response object, using the HTTP status code indicating that access to the resource is forbidden.
*/

/*
Example 1:
- input: 'https://example.org/abc/xyz?123'
- output: 'D:\\GitHubProjects\\eloquent-javascript-code\\20_nodejs\\file-server\\abc\\xyz'
*/
function urlPath(url: string) {
  let { pathname } = new URL(url, "http://d");
  let path = resolve(decodeURIComponent(pathname).slice(1));
  if (
    path != baseDirectory &&
    !path.startsWith(baseDirectory + sep)
  ) {
    throw {
      status: 403,
      body: "Forbidden",
    };
  }
  return path;
}



/*
GET `/:filePath` route handler.
- throws error if file does not exist
- returns array of file names in `path` if `path` is a directory
- returns file (data) if `path` is a file
*/

import { ReadStream, Stats, WriteStream, createReadStream } from "node:fs";
import { stat, readdir } from "node:fs/promises";
import { lookup } from "mime-types";

methods.GET = async function (request: IncomingMessage) {
  let path = urlPath(request.url!);
  let stats: Stats;

  try {
    stats = await stat(path);
  } catch (error: any) {
    if (error.code !== "ENOENT") throw error;
    return {
      status: 404,
      body: "File not found"
    };
  }

  if (stats.isDirectory()) {
    return {
      body: (await readdir(path)).join("\n")
    };
  }
  return {
    body: createReadStream(path),
    type: lookup(path)
  }
}



/*
DELETE `/:filePath` route handler
- Returns success status code 204 (no content) whether or not file exists to comply with HTTP idempotent standard.
- Idempotent = Making the same request multiple times always returns same result as doing it once.
*/

import { rmdir, unlink } from "node:fs/promises";

methods.DELETE = async function (request: IncomingMessage) {
  let path = urlPath(request.url!);
  let stats: Stats;

  try {
    stats = await stat(path);
  } catch (error: any) {
    if (error.code !== "ENOENT") throw error;
    return { status: 204 };
  }

  stats.isDirectory() ? await rmdir(path) : await unlink(path);

  /*
  When an HTTP response does not contain any data, the status code 204 (“no content”) can be used to indicate this.
  */
  return { status: 204 };
}



/*
PUT `/:filePath` route handler
- Overwrites file it if exists already.
*/

/*
When something goes wrong when opening the file, createWriteStream will still return a stream, but that stream will fire an "error" event. The stream from the request may also fail, for example if the network goes down. So we wire up both streams’ "error" events to reject the promise. When pipe is done, it will close the output stream, which causes it to fire a "finish" event. That’s the point where we can successfully resolve the promise (returning nothing).
*/

import { createWriteStream } from "node:fs";

function pipeStream(from: IncomingMessage, to: WriteStream) {
  return new Promise((resolve, reject) => {
    from.on("error", reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to);
  });
}

methods.PUT = async function (request: IncomingMessage) {
  let path = urlPath(request.url!);
  await pipeStream(request, createWriteStream(path));
  return { status: 204 };
}

/*
Chapter 20: Node.js - File Server

This is an HTTP server that allows remote access to a file system.
It allows web apps to store and share data or it can give people shared
access to some files.
*/

import { createServer, IncomingMessage } from "http";

/*
`methods` is an object that stores async HTTP method handlers.
Theses handlers take a request object as argument returns a promise
that resolves to an object that describes the response.
*/

const methods = Object.create(null);

/*
This starts a server that returns 405 error response by default.
If the handler's promise is rejected, it sends an error response to the client.
If the handler's promise is resolved, we destructure some of its properties.
`body` may be `null`, a string, a buffer, or a readable stream. If it is a
readable stream, we call its `pipe` method to forward all its content to a writable stream. Otherwise, we pass `body` to the response's `end` method.
*/

createServer((request, response) => {
    let handler = methods[request.method!] || notAllowed;
    handler(request)
        .catch((error) => {
            if (error.status != null) return error;
            return { body: String(error), status: 500 };
        })
        .then(({ body, status = 200, type = "text/plain" }) => {
            response.writeHead(status, { "Content-Type": type });
            if (body && body.pipe) body.pipe(response);
            else response.end(body);
        });
}).listen(8000);

async function notAllowed(request) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed.`
    }
}

/*
`urlPath` is a function that returns the relative path for a given URL
after parsing the URL and removing the `%20`-style escape codes.

It uses the `resolve` function and throws an error if the given URL is 
below the current working directory (`cwd`) for security purposes. Otherwise
it returns the correct path string.
*/

import { parse } from "url";
import { resolve, sep } from "path";

const baseDirectory = process.cwd();

function urlPath(url) {
    let { pathname } = parse(url);
    let path = resolve(decodeURIComponent(pathname!).slice(1));
    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + sep)) {
        throw { status: 403, body: "Forbidden" };
    }
    return path;
}

/*
`methods.GET` is a method that returns a list of files in a directory or a
file's content when reading a regular file. It uses the `mime` package to
return the correct `Content-Type` header in the response for a given file.
It returns a 404 status code if the file doesn't exist.
*/

import { createReadStream } from "fs";
import { stat, readdir } from "fs/promises";
import mime from "mime";

methods.GET = async function (request: IncomingMessage) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error: any) {
        if (error.code != "ENOENT") throw error;
        return { status: 404, body: "File not found" };
    }
    if (stats.isDirectory()) return { body: (await readdir(path)).join("\n") };
    return {
        body: createReadStream(path),
        type: mime.getType(path)
    };
}

/*
`methods.DELETE` deletes a directory or file. Even if the file cannot be found,
we return a success HTTP status code of 204 since the request is technically
already done and because the HTTP standard encourages requests to be idempotent.
Idempotent means making the same request multiple times produces the same 
result as making it once.
*/

import { rmdir, unlink } from "fs/promises";

methods.DELETE = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error: any) {
        if (error.code != "ENOENT") throw error;
        return { status: 204 };
    }
    if (stats.isDirectory()) await rmdir(path);
    else await unlink(path);
    return { status: 204 };
}

/*
`methods.PUT` creates or updates an existing file. We don't check if it exists here since we'll just overwrite it if it does.
*/

import { createWriteStream } from "fs";

function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}

methods.PUT = async function (request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return { status: 204 };
}

// MKCOL extension from `Directory Creation` exercise
import { mkdir } from "fs/promises";

methods.MKCOL = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error: any) {
        if (error.code != "ENOENT") throw error;
        await mkdir(path);
        return { status: 204 };
    }
    if (stats.isDirectory()) return { status: 204 };
    return { status: 400, body: "Not a directory" };
}
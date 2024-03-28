"use strict";
/*
Chapter 20: Node.js - File Server

This is an HTTP server that allows remote access to a file system.
It allows web apps to store and share data or it can give people shared access to some files.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_http_1 = require("node:http");
var methods = Object.create(null);
/*
Creates a server that returns a 500 status by default.
- A RESTful API for files instead of database records.
- Maps root (from `/`) file requests to their actual stored location in `/public/`. E.g., `GET /file.txt` retrieves the file stored at `/public/file.txt`.
*/
(0, node_http_1.createServer)(function (request, response) {
    /*
    `handler` is an async function that returns a promise.
    It follows the error-first handling Node.js convention for async functions.
    */
    var handler = methods[request.method] || notAllowed;
    handler(request)
        // handles rejected `request` promise
        .catch(function (error) {
        if (error.status != null)
            return error;
        return {
            body: String(error),
            status: 500,
        };
    })
        // handles fulfilled `request` promise
        .then(function (_a) {
        var body = _a.body, _b = _a.status, status = _b === void 0 ? 200 : _b, _c = _a.type, type = _c === void 0 ? "text/plain" : _c;
        response.writeHead(status, { "Content-Type": type });
        var isReadableStream = body && body.pipe;
        if (isReadableStream) {
            /*
            Forward its content to a writable stream.
            */
            body.pipe(response);
        }
        else {
            /*
            `body` is null, a string or a buffer.
            */
            response.end(body);
        }
    });
}).listen(8000);
function notAllowed(request) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    status: 405,
                    body: "Method ".concat(request.method, " not allowed.")
                }];
        });
    });
}
var node_path_1 = require("node:path");
var baseDirectory = process.cwd();
/*
To avoid such problems, urlPath uses the resolve function from the node:path module, which resolves relative paths. It then verifies that the result is below the working directory. The process.cwd function (where cwd stands for “current working directory”) can be used to find this working directory. The sep binding from the node:path package is the system’s path separator—a backslash on Windows and a forward slash on most other systems. When the path doesn’t start with the base directory, the function throws an error response object, using the HTTP status code indicating that access to the resource is forbidden.
*/
/*
Example 1:
- input: 'https://example.org/abc/xyz?123'
- output: 'D:\\GitHubProjects\\eloquent-javascript-code\\20_nodejs\\file-server\\abc\\xyz'
*/
function urlPath(url) {
    var pathname = new URL(url, "http://d").pathname;
    var path = (0, node_path_1.resolve)(decodeURIComponent(pathname).slice(1));
    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + node_path_1.sep)) {
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
var node_fs_1 = require("node:fs");
var promises_1 = require("node:fs/promises");
var mime_types_1 = require("mime-types");
methods.GET = function (request) {
    return __awaiter(this, void 0, void 0, function () {
        var path, stats, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    path = urlPath(request.url);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, promises_1.stat)(path)];
                case 2:
                    stats = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    if (error_1.code !== "ENOENT")
                        throw error_1;
                    return [2 /*return*/, {
                            status: 404,
                            body: "File not found"
                        }];
                case 4:
                    if (!stats.isDirectory()) return [3 /*break*/, 6];
                    _a = {};
                    return [4 /*yield*/, (0, promises_1.readdir)(path)];
                case 5: return [2 /*return*/, (_a.body = (_b.sent()).join("\n"),
                        _a)];
                case 6: return [2 /*return*/, {
                        body: (0, node_fs_1.createReadStream)(path),
                        type: (0, mime_types_1.lookup)(path)
                    }];
            }
        });
    });
};
/*
DELETE `/:filePath` route handler
- Returns success status code 204 (no content) whether or not file exists to comply with HTTP idempotent standard.
- Idempotent = Making the same request multiple times always returns same result as doing it once.
*/
var promises_2 = require("node:fs/promises");
methods.DELETE = function (request) {
    return __awaiter(this, void 0, void 0, function () {
        var path, stats, error_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    path = urlPath(request.url);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, promises_1.stat)(path)];
                case 2:
                    stats = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    if (error_2.code !== "ENOENT")
                        throw error_2;
                    else
                        return [2 /*return*/, { status: 204 }];
                    return [3 /*break*/, 4];
                case 4:
                    if (!stats.isDirectory()) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, promises_2.rmdir)(path)];
                case 5:
                    _a = _b.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, (0, promises_2.unlink)(path)];
                case 7:
                    _a = _b.sent();
                    _b.label = 8;
                case 8:
                    _a;
                    /*
                    When an HTTP response does not contain any data, the status code 204 (“no content”) can be used to indicate this.
                    */
                    return [2 /*return*/, { status: 204 }];
            }
        });
    });
};
/*
PUT `/:filePath` route handler
- Overwrites file it if exists already.
*/
/*
When something goes wrong when opening the file, createWriteStream will still return a stream, but that stream will fire an "error" event. The stream from the request may also fail, for example if the network goes down. So we wire up both streams’ "error" events to reject the promise. When pipe is done, it will close the output stream, which causes it to fire a "finish" event. That’s the point where we can successfully resolve the promise (returning nothing).
*/
var node_fs_2 = require("node:fs");
function pipeStream(from, to) {
    return new Promise(function (resolve, reject) {
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}
methods.PUT = function (request) {
    return __awaiter(this, void 0, void 0, function () {
        var path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = urlPath(request.url);
                    return [4 /*yield*/, pipeStream(request, (0, node_fs_2.createWriteStream)(path))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { status: 204 }];
            }
        });
    });
};
/*
Extension from Exercise 20.2 Directory Creation
*/
var promises_3 = require("node:fs/promises");
methods.MKCOL = function (request) {
    return __awaiter(this, void 0, void 0, function () {
        var path, stats, error_3, dir, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = urlPath(request.url);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, (0, promises_1.stat)(path)];
                case 2:
                    // Entity is a file or directory that already exists
                    stats = _a.sent();
                    if (stats.isDirectory())
                        return [2 /*return*/, { status: 204 }];
                    return [2 /*return*/, {
                            status: 400,
                            body: "File with this name already exists"
                        }];
                case 3:
                    error_3 = _a.sent();
                    if (error_3.code !== "ENOENT") {
                        console.error("Error processing path '".concat(path, "': "), error_3);
                        throw error_3;
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, (0, promises_3.mkdir)(path)];
                case 5:
                    dir = _a.sent();
                    if (dir !== undefined)
                        throw new Error("Failed to create directory");
                    return [2 /*return*/, { status: 204 }];
                case 6:
                    error_4 = _a.sent();
                    return [2 /*return*/, {
                            status: 500,
                            body: "Error creating directory: ".concat(error_4)
                        }];
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=index.js.map
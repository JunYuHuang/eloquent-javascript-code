"use strict";
/*
Chapter 20: Node.js - File Server

This is an HTTP server that allows remote access to a file system.
It allows web apps to store and share data or it can give people shared
access to some files.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
/*
`methods` is an object that stores async HTTP method handlers.
Theses handlers take a request object as argument returns a promise
that resolves to an object that describes the response.
*/
var methods = Object.create(null);
/*
This starts a server that returns 405 error response by default.
If the handler's promise is rejected, it sends an error response to the client.
If the handler's promise is resolved, we destructure some of its properties.
`body` may be `null`, a string, a buffer, or a readable stream. If it is a
readable stream, we call its `pipe` method to forward all its content to a writable stream. Otherwise, we pass `body` to the response's `end` method.
*/
(0, http_1.createServer)(function (request, response) {
    var handler = methods[request.method] || notAllowed;
    handler(request)
        .catch(function (error) {
        if (error.status != null)
            return error;
        return { body: String(error), status: 500 };
    })
        .then(function (_a) {
        var body = _a.body, _b = _a.status, status = _b === void 0 ? 200 : _b, _c = _a.type, type = _c === void 0 ? "text/plain" : _c;
        response.writeHead(status, { "Content-Type": type });
        if (body && body.pipe)
            body.pipe(response);
        else
            response.end(body);
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
/*
`urlPath` is a function that returns the relative path for a given URL
after parsing the URL and removing the `%20`-style escape codes.

It uses the `resolve` function and throws an error if the given URL is
below the current working directory (`cwd`) for security purposes. Otherwise
it returns the correct path string.
*/
var url_1 = require("url");
var path_1 = require("path");
var baseDirectory = process.cwd();
function urlPath(url) {
    var pathname = (0, url_1.parse)(url).pathname;
    var path = (0, path_1.resolve)(decodeURIComponent(pathname).slice(1));
    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + path_1.sep)) {
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
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var mime_1 = __importDefault(require("mime"));
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
                    if (error_1.code != "ENOENT")
                        throw error_1;
                    return [2 /*return*/, { status: 404, body: "File not found" }];
                case 4:
                    if (!stats.isDirectory()) return [3 /*break*/, 6];
                    _a = {};
                    return [4 /*yield*/, (0, promises_1.readdir)(path)];
                case 5: return [2 /*return*/, (_a.body = (_b.sent()).join("\n"), _a)];
                case 6: return [2 /*return*/, {
                        body: (0, fs_1.createReadStream)(path),
                        type: mime_1.default.getType(path)
                    }];
            }
        });
    });
};
/*
`methods.DELETE` deletes a directory or file. Even if the file cannot be found,
we return a success HTTP status code of 204 since the request is technically
already done and because the HTTP standard encourages requests to be idempotent.
Idempotent means making the same request multiple times produces the same
result as making it once.
*/
var promises_2 = require("fs/promises");
methods.DELETE = function (request) {
    return __awaiter(this, void 0, void 0, function () {
        var path, stats, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = urlPath(request.url);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, promises_1.stat)(path)];
                case 2:
                    stats = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    if (error_2.code != "ENOENT")
                        throw error_2;
                    return [2 /*return*/, { status: 204 }];
                case 4:
                    if (!stats.isDirectory()) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, promises_2.rmdir)(path)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, (0, promises_2.unlink)(path)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/, { status: 204 }];
            }
        });
    });
};
/*
`methods.PUT` creates or updates an existing file. We don't check if it exists here since we'll just overwrite it if it does.
*/
var fs_2 = require("fs");
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
                    return [4 /*yield*/, pipeStream(request, (0, fs_2.createWriteStream)(path))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { status: 204 }];
            }
        });
    });
};
//# sourceMappingURL=index.js.map
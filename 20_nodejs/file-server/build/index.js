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
*/
(0, node_http_1.createServer)(function (request, response) {
    var handler = methods[request.method] || notAllowed;
    handler(request)
        .catch(function (error) {
        if (error.status != null)
            return error;
        return {
            body: String(error),
            status: 500,
        };
    })
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
//# sourceMappingURL=index.js.map
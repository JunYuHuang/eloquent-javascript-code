"use strict";
// TYPES
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
// SERVING FILES
/*
When a request matches none of the request types defined in our router, the server must interpret it as a request for a file in the public directory. It would be possible to use the file server defined in Chapter 20 to serve such files, but we neither need nor want to support PUT and DELETE requests on files, and we would like to have advanced features such as support for caching. So let’s use a solid, well-tested static file server from NPM instead.

I opted for serve-static. This isn’t the only such server on NPM, but it works well and fits our purposes. The serve-static package exports a function that can be called with a root directory to produce a request handler function. The handler function accepts the request and response arguments provided by the server from "node:http", and a third argument, a function that it will call if no file matches the request. We want our server to first check for requests that we should handle specially, as defined in the router, so we wrap it in another function.
*/
var node_http_1 = require("node:http");
var serve_static_1 = __importDefault(require("serve-static"));
var node_fs_1 = require("node:fs");
function notFound(request, response) {
    response.writeHead(404, "Not found");
    response.end("<h1>Not found</h1>");
}
var SkillShareServer = /** @class */ (function () {
    function SkillShareServer(talks) {
        var _this = this;
        this.talks = talks;
        this.version = 0;
        this.waiting = [];
        var fileServer = (0, serve_static_1.default)("./public");
        this.server = (0, node_http_1.createServer)(function (request, response) {
            serveFromRouter(_this, request, response, function () {
                fileServer(request, response, function () { return notFound(request, response); });
            });
        });
    }
    SkillShareServer.prototype.updated = function () {
        throw new Error("Method not implemented.");
    };
    SkillShareServer.prototype.talkResponse = function () {
        throw new Error("Method not implemented.");
    };
    SkillShareServer.prototype.waitForChanges = function (time) {
        throw new Error("Method not implemented.");
    };
    SkillShareServer.prototype.start = function (port) {
        this.server.listen(port);
        /*
        Extension from Exercise 21.1 Disk Persistence
        - Try to load `talks` from file if it exists
        */
        var file = "talks.json";
        var cannotLoadTalks = (0, node_fs_1.statSync)(file, { throwIfNoEntry: false }) === undefined;
        if (cannotLoadTalks)
            return;
        this.talks = JSON.parse((0, node_fs_1.readFileSync)(file, { encoding: "utf-8" }));
    };
    SkillShareServer.prototype.stop = function () {
        this.server.close();
    };
    return SkillShareServer;
}());
var router_1 = require("./router");
var router = new router_1.Router();
var defaultHeaders = { "Content-Type": "text/plain" };
function serveFromRouter(server, request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var resolved, _a, body, _b, status, _c, headers;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, router
                        .resolve(request, server)
                        .catch(function (error) {
                        if (error.status != null)
                            return error;
                        return {
                            body: String(error),
                            status: 500,
                        };
                    })];
                case 1:
                    resolved = _d.sent();
                    if (!resolved)
                        return [2 /*return*/, next()];
                    return [4 /*yield*/, resolved];
                case 2:
                    _a = _d.sent(), body = _a.body, _b = _a.status, status = _b === void 0 ? 200 : _b, _c = _a.headers, headers = _c === void 0 ? defaultHeaders : _c;
                    response.writeHead(status, headers);
                    response.end(body);
                    return [2 /*return*/];
            }
        });
    });
}
// TALKS AS RESOURCES
/*
The talks that have been proposed are stored in the talks property of the server, an object whose property names are the talk titles. We will add some handlers to our router that expose these as HTTP resources under /talks/[title].

The handler for requests that GET a single talk must look up the talk and respond either with the talk’s JSON data or with a 404 error response.
*/
var talkPath = /^\/talks\/([^\/]+)$/;
router.add("GET", talkPath, function (server, title) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (Object.hasOwn(server.talks, title)) {
            return [2 /*return*/, {
                    body: JSON.stringify(server.talks[title]),
                    headers: { "Content-Type": "application/json" }
                }];
        }
        return [2 /*return*/, {
                status: 404,
                body: "No talk '".concat(title, "' found"),
            }];
    });
}); });
/*
Deleting a talk is done by removing it from the talks object.

The updated method, which we will define later, notifies waiting long polling requests about the change.
*/
router.add("DELETE", talkPath, function (server, title) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (Object.hasOwn(server.talks, title)) {
            delete server.talks[title];
            server.updated();
        }
        return [2 /*return*/, { status: 204 }];
    });
}); });
/*
One handler that needs to read request bodies is the PUT handler, which is used to create new talks. It has to check whether the data it was given has presenter and summary properties, which are strings. Any data coming from outside the system might be nonsense, and we don’t want to corrupt our internal data model or crash when bad requests come in.

If the data looks valid, the handler stores an object that represents the new talk in the talks object, possibly overwriting an existing talk with this title, and again calls updated.

To read the body from the request stream, we will use the json function from "node:stream/consumers", which collects the data in the stream and then parses it as JSON. There are similar exports called text (to read the content as a string) and buffer (to read it as binary data) in this package. Since json is a very generic name, the import renames it to readJSON to avoid confusion.
*/
var consumers_1 = require("node:stream/consumers");
router.add("PUT", talkPath, function (server, title, request) { return __awaiter(void 0, void 0, void 0, function () {
    var talk;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, consumers_1.json)(request)];
            case 1:
                talk = _a.sent();
                if (!talk ||
                    typeof talk.presenter !== "string" ||
                    typeof talk.summary !== "string") {
                    return [2 /*return*/, {
                            status: 400,
                            body: "Bad talk data"
                        }];
                }
                server.talks[title] = {
                    title: title,
                    presenter: talk.presenter,
                    summary: talk.summary,
                    comments: []
                };
                server.updated();
                return [2 /*return*/, { status: 204 }];
        }
    });
}); });
/*
Adding a comment to a talk works similarly. We use readJSON to get the content of the request, validate the resulting data, and store it as a comment when it looks valid.
*/
var commentPath = /^\/talks\/([^\/]+)\/comments$/;
router.add("POST", commentPath, function (server, title, request) { return __awaiter(void 0, void 0, void 0, function () {
    var comment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, consumers_1.json)(request)];
            case 1:
                comment = _a.sent();
                if (!comment ||
                    typeof comment.author !== "string" ||
                    typeof comment.message !== "string") {
                    return [2 /*return*/, {
                            status: 400,
                            body: "Bad comment data"
                        }];
                }
                if (Object.hasOwn(server.talks, title)) {
                    server.talks[title].comments.push(comment);
                    server.updated();
                    return [2 /*return*/, { status: 204 }];
                }
                return [2 /*return*/, {
                        status: 404,
                        body: "No talk '".concat(title, "' found")
                    }];
        }
    });
}); });
// LONG POLLING SUPPORT
/*
The most interesting aspect of the server is the part that handles long polling. When a GET request comes in for /talks, it may be either a regular request or a long polling request.

There will be multiple places in which we have to send an array of talks to the client, so we first define a helper method that builds up such an array and includes an ETag header in the response.
*/
SkillShareServer.prototype.talkResponse = function () {
    var _this = this;
    var talks = Object.keys(this.talks)
        .map(function (title) { return _this.talks[title]; });
    return {
        body: JSON.stringify(talks),
        headers: {
            "Content-Type": "application/json",
            "ETag": "\"".concat(this.version, "\""),
            "Cache-Control": "no-store",
        }
    };
};
/*
The handler itself needs to look at the request headers to see whether If-None-Match and Prefer headers are present. Node stores headers, whose names are specified to be case insensitive, under their lowercase names.

If no tag was given or a tag was given that doesn’t match the server’s current version, the handler responds with the list of talks. If the request is conditional and the talks did not change, we consult the Prefer header to see whether we should delay the response or respond right away.
*/
router.add("GET", /^\/talks$/, function (server, request) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, wait;
    return __generator(this, function (_a) {
        tag = /"(.*)"/.exec(request.headers["if-none-match"]);
        wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
        if (!tag || Number(tag[1]) !== server.version) {
            return [2 /*return*/, server.talkResponse()];
        }
        if (!wait)
            return [2 /*return*/, { status: 304 }];
        return [2 /*return*/, server.waitForChanges(Number(wait[1]))];
    });
}); });
/*
Callback functions for delayed requests are stored in the server’s `waiting` array so that they can be notified when something happens. The `waitForChanges` method also immediately sets a timer to respond with a 304 status when the request has waited long enough.
*/
SkillShareServer.prototype.waitForChanges = function (time) {
    var _this = this;
    return new Promise(function (resolve) {
        _this.waiting.push(resolve);
        setTimeout(function () {
            if (!_this.waiting.includes(resolve))
                return;
            _this.waiting = _this.waiting.filter(function (res) { return res != resolve; });
            resolve({ status: 304 });
        }, time * 1000);
    });
};
/*
Registering a change with updated increases the version property and wakes up all waiting requests.
*/
var node_fs_2 = require("node:fs");
SkillShareServer.prototype.updated = function () {
    this.version++;
    var response = this.talkResponse();
    this.waiting.forEach(function (resolve) { return resolve(response); });
    this.waiting = [];
    /*
    Extension from Exercise 21.1 Disk Persistence
    - Save the updated `talks` to a file
    */
    (0, node_fs_2.writeFileSync)("talks.json", JSON.stringify(this.talks));
};
/*
That concludes the server code. If we create an instance of SkillShareServer and start it on port 8000, the resulting HTTP server serves files from the public subdirectory alongside a talk-managing interface under the /talks URL.
*/
new SkillShareServer({}).start(8000);
//# sourceMappingURL=server.js.map
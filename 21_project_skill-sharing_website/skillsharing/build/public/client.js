"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// ACTIONS
/*
The application state consists of the list of talks and the name of the user, and we’ll store it in a `{talks, user}` object. We don’t allow the user interface to directly manipulate the state or send off HTTP requests. Rather, it may emit actions that describe what the user is trying to do.

The `handleAction` function takes such an action and makes it happen. Because our state updates are so simple, state changes are handled in the same function.

We’ll store the user’s name in `localStorage` so that it can be restored when the page is loaded.
*/
function handleAction(state, action) {
    switch (action.type) {
        case "setUser":
            localStorage.setItem("userName", action.user);
            return __assign(__assign({}, state), { user: action.user });
        case "setTalks":
            return __assign(__assign({}, state), { talks: action.talks });
        case "newTalk":
            fetchOK(talkURL(action.title), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    presenter: state.user,
                    summary: action.summary,
                }),
            }).catch(reportError);
            break;
        case "deleteTalk":
            fetchOK(talkURL(action.talk), { method: "DELETE" }).catch(reportError);
            break;
        case "newComment":
            fetchOK(talkURL(action.talk) + "/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    author: state.user,
                    message: action.message,
                }),
            }).catch(reportError);
            break;
        default:
            break;
    }
    return state;
}
/*
The actions that need to involve the server make network requests, using `fetch`, to the HTTP interface described earlier. We use a wrapper function, `fetchOK`, which makes sure the returned promise is rejected when the server returns an error code.
*/
function fetchOK(url, options) {
    return fetch(url, options).then(function (response) {
        if (response.status < 400)
            return response;
        throw new Error(response.statusText);
    });
}
/*
This helper function is used to build up a URL for a talk with a given title.
*/
function talkURL(title) {
    return "talks/" + encodeURIComponent(title);
}
/*
When the request fails, we don’t want to have our page just sit there, doing nothing without explanation. So we define a function called `reportError`, which at least shows the user a dialog that tells them something went wrong.
*/
function reportError(error) {
    alert(String(error));
}
// RENDERING COMPONENTS
/*
We’ll use an approach similar to the one we saw in Chapter 19, splitting the application into components. But since some of the components either never need to update or are always fully redrawn when updated, we’ll define those not as classes but as functions that directly return a DOM node. For example, here is a component that shows the field where the user can enter their name:
*/
function renderUserField(name, dispatch) {
    return elt("label", {}, "Your name: ", elt("input", {
        type: "text",
        value: name,
        onchange: function (event) {
            dispatch({ type: "setUser", user: event.target.value });
        },
    }));
}
/*
The `elt` function used to construct DOM elements is the one we used in Chapter 19.

One of the main things that interface components do is creating DOM structure. We again don’t want to directly use the verbose DOM methods for that, so here’s a slightly expanded version of the `elt` function:

The main difference between this version and the one we used in Chapter 16 is that it assigns properties to DOM nodes, not attributes. This means we can’t use it to set arbitrary attributes, but we can use it to set properties whose value isn’t a string, such as `onclick`, which can be set to a function to register a click event handler.

This allows this convenient style for registering event handlers.
*/
function elt(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var dom = document.createElement(type);
    if (props)
        Object.assign(dom, props);
    for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
        var child = children_1[_a];
        if (typeof child !== "string")
            dom.appendChild(child);
        else
            dom.appendChild(document.createTextNode(child));
    }
    return dom;
}
/*
A similar function is used to render talks, which include a list of comments and a form for adding a new comment.

The `"submit"` event handler calls `form.reset` to clear the form’s content after creating a `"newComment"` action.

When creating moderately complex pieces of DOM, this style of programming starts to look rather messy. To avoid this, people often use a templating language, which allows you to write your interface as an HTML file with some special markers to indicate where dynamic elements go. Or they use JSX, a non-standard JavaScript dialect that allows you to write something very close to HTML tags in your program as if they are JavaScript expressions. Both of these approaches use additional tools to pre-process the code before it can be run, which we will avoid in this chapter.
*/
function renderTalk(talk, dispatch) {
    return elt.apply(void 0, __spreadArray(__spreadArray(["section",
        { className: "talk" },
        elt("h2", null, talk.title, " ", elt("button", {
            type: "button",
            onclick: function () {
                dispatch({ type: "deleteTalk", talk: talk.title });
            },
        }, "Delete")),
        elt("div", null, "by ", elt("strong", null, talk.presenter)),
        elt("p", null, talk.summary)], talk.comments.map(renderComment), false), [elt("form", {
            onsubmit: function (event) {
                event.preventDefault();
                var form = event.target;
                dispatch({
                    type: "newComment",
                    talk: talk.title,
                    message: form.elements.comment.value,
                });
                form.reset();
            },
        }, elt("input", { type: "text", name: "comment" }), " ", elt("button", { type: "submit" }, "Add comment"))], false));
}
/*
Comments are simple to render.
*/
function renderComment(comment) {
    return elt("p", { className: "comment" }, elt("strong", null, comment.author), ": ", comment.message);
}
/*
Extension from Exercise 21.2 Comment Field Resets
- add `TalkComponent` class
*/
function renderCommentForm(talk, dispatch) {
    return elt("form", {
        onsubmit: function (event) {
            event.preventDefault();
            var form = event.target;
            dispatch({
                type: "newComment",
                talk: talk.title,
                message: form.elements.comment.value,
            });
            form.reset();
        },
    }, elt("input", { type: "text", name: "comment" }), " ", elt("button", { type: "submit" }, "Add comment"));
}
function renderTalkBody(talk, dispatch) {
    return elt("div", null, elt("h2", null, talk.title, " ", elt("button", {
        type: "button",
        onclick: function () {
            dispatch({ type: "deleteTalk", talk: talk.title });
        },
    }, "Delete")), elt("div", null, "by ", elt("strong", null, talk.presenter)), elt("p", null, talk.summary));
}
var TalkComponent = /** @class */ (function () {
    function TalkComponent(talk, dispatch) {
        this.dispatch = dispatch;
        this.talkBodyDOM = elt("div", null, renderTalkBody(talk, dispatch));
        this.commentDOM = elt("div", { className: "comments" });
        this.dom = elt("section", { className: "talk" }, this.talkBodyDOM, this.commentDOM, renderCommentForm(talk, dispatch));
        this.syncState(talk);
    }
    TalkComponent.prototype.syncState = function (talk) {
        if (talk == this.talk)
            return;
        // update talk body / details if needed
        if (this.talk &&
            (talk.title !== this.talk.title ||
                talk.presenter !== this.talk.presenter ||
                talk.summary !== this.talk.summary)) {
            this.talkBodyDOM.textContent = "";
            this.talkBodyDOM.appendChild(renderTalkBody(talk, this.dispatch));
        }
        // update comments
        this.commentDOM.textContent = "";
        for (var _i = 0, _a = talk.comments; _i < _a.length; _i++) {
            var comment = _a[_i];
            this.commentDOM.appendChild(renderComment(comment, this.dispatch));
        }
        this.talk = talk;
    };
    return TalkComponent;
}());
/*
Finally, the form that the user can use to create a new talk is rendered like this:
*/
function renderTalkForm(dispatch) {
    var title = elt("input", { type: "text" });
    var summary = elt("input", { type: "text" });
    return elt("form", {
        onsubmit: function (event) {
            event.preventDefault();
            dispatch({
                type: "newTalk",
                title: title.value,
                summary: summary.value,
            });
            event.target.reset();
        },
    }, elt("h3", null, "Submit a Talk"), elt("label", null, "Title: ", title), elt("label", null, "Summary: ", summary), elt("button", { type: "submit" }, "Submit"));
}
// POLLING
/*
To start the app we need the current list of talks. Since the initial load is closely related to the long polling process—the `ETag` from the load must be used when polling—we’ll write a function that keeps polling the server for `/talks` and calls a callback function when a new set of talks is available.

This is an `async` function so that looping and waiting for the request is easier. It runs an infinite loop that, on each iteration, retrieves the list of talks—either normally or, if this isn’t the first request, with the headers included that make it a long polling request.

When a request fails, the function waits a moment and then tries again. This way, if your network connection goes away for a while and then comes back, the application can recover and continue updating. The promise resolved via `setTimeout` is a way to force the async function to wait.

When the server gives back a `304` response, that means a long polling request timed out, so the function should just immediately start the next request. If the response is a normal `200` response, its body is read as JSON and passed to the callback, and its `ETag` header value is stored for the next iteration.
*/
function pollTalks(update) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, response, error_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tag = undefined;
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 8];
                    response = void 0;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, fetchOK("/talks", {
                            headers: tag && {
                                "If-None-Match": tag,
                                Prefer: "wait=90",
                            },
                        })];
                case 3:
                    response = _b.sent();
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _b.sent();
                    console.error("Request failed: ", error_1);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 1];
                case 6:
                    if (response.status === 304)
                        return [3 /*break*/, 1];
                    tag = response.headers.get("ETag");
                    _a = update;
                    return [4 /*yield*/, response.json()];
                case 7:
                    _a.apply(void 0, [_b.sent()]);
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// THE APPLICATION
/*
The following component ties the whole user interface together:

When the talks change, this component redraws all of them. This is simple but also wasteful. We’ll get back to that in the exercises.
*/
/*
Extension from Exercise 21.2 Comment Field Resets
- Update how the app syncs / updates its talks
*/
var SkillShareApp = /** @class */ (function () {
    function SkillShareApp(state, dispatch) {
        this.dispatch = dispatch;
        this.talkDOM = elt("div", { className: "talks" });
        this.talkToComponent = {};
        this.dom = elt("div", null, renderUserField(state.user, dispatch), this.talkDOM, renderTalkForm(dispatch));
        this.syncState(state);
    }
    SkillShareApp.prototype.syncState = function (state) {
        if (state.talks == this.talks)
            return;
        // Create or update talks
        var talkTitles = new Set();
        for (var _i = 0, _a = state.talks; _i < _a.length; _i++) {
            var talk = _a[_i];
            if (!Object.hasOwn(this.talkToComponent, talk.title)) {
                this.talkToComponent[talk.title] = new TalkComponent(talk, this.dispatch);
                this.talkDOM.appendChild(this.talkToComponent[talk.title].dom);
            }
            this.talkToComponent[talk.title].syncState(talk);
            talkTitles.add(talk.title);
        }
        // Remove deleted talks
        for (var _b = 0, _c = Object.entries(this.talkToComponent); _b < _c.length; _b++) {
            var _d = _c[_b], title = _d[0], component = _d[1];
            if (talkTitles.has(title))
                continue;
            this.talkDOM.removeChild(component.dom);
            delete this.talkToComponent[title];
        }
        this.talks = state.talks;
    };
    return SkillShareApp;
}());
/*
We can start the application like this.

If you run the server and open two browser windows for http://localhost:8000 next to each other, you can see that the actions you perform in one window are immediately visible in the other.
*/
function runApp() {
    var user = localStorage.getItem("userName") || "Anon";
    var state;
    var app;
    function dispatch(action) {
        state = handleAction(state, action);
        app.syncState(state);
    }
    pollTalks(function (talks) {
        if (app) {
            dispatch({ type: "setTalks", talks: talks });
            return;
        }
        state = { user: user, talks: talks };
        app = new SkillShareApp(state, dispatch);
        document.body.appendChild(app.dom);
    }).catch(reportError);
}
runApp();
//# sourceMappingURL=client.js.map
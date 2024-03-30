"use strict";

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
      return {
        ...state,
        user: action.user,
      };
    case "setTalks":
      return {
        ...state,
        talks: action.talks,
      };
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
  return fetch(url, options).then((response) => {
    if (response.status < 400) return response;
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
  return elt(
    "label",
    {},
    "Your name: ",
    elt("input", {
      type: "text",
      value: name,
      onchange(event) {
        dispatch({ type: "setUser", user: event.target.value });
      },
    })
  );
}

/*
The `elt` function used to construct DOM elements is the one we used in Chapter 19.

One of the main things that interface components do is creating DOM structure. We again don’t want to directly use the verbose DOM methods for that, so here’s a slightly expanded version of the `elt` function:

The main difference between this version and the one we used in Chapter 16 is that it assigns properties to DOM nodes, not attributes. This means we can’t use it to set arbitrary attributes, but we can use it to set properties whose value isn’t a string, such as `onclick`, which can be set to a function to register a click event handler.

This allows this convenient style for registering event handlers.
*/

function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);

  for (let child of children) {
    if (typeof child !== "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }

  return dom;
}

/*
A similar function is used to render talks, which include a list of comments and a form for adding a new comment.

The `"submit"` event handler calls `form.reset` to clear the form’s content after creating a `"newComment"` action.

When creating moderately complex pieces of DOM, this style of programming starts to look rather messy. To avoid this, people often use a templating language, which allows you to write your interface as an HTML file with some special markers to indicate where dynamic elements go. Or they use JSX, a non-standard JavaScript dialect that allows you to write something very close to HTML tags in your program as if they are JavaScript expressions. Both of these approaches use additional tools to pre-process the code before it can be run, which we will avoid in this chapter.
*/

function renderTalk(talk, dispatch) {
  return elt(
    "section",
    { className: "talk" },
    elt(
      "h2",
      null,
      talk.title,
      " ",
      elt(
        "button",
        {
          type: "button",
          onclick() {
            dispatch({ type: "deleteTalk", talk: talk.title });
          },
        },
        "Delete"
      )
    ),
    elt("div", null, "by ", elt("strong", null, talk.presenter)),
    elt("p", null, talk.summary),
    ...talk.comments.map(renderComment),
    elt(
      "form",
      {
        onsubmit(event) {
          event.preventDefault();
          let form = event.target;
          dispatch({
            type: "newComment",
            talk: talk.title,
            message: form.elements.comment.value,
          });
          form.reset();
        },
      },
      elt("input", { type: "text", name: "comment" }),
      " ",
      elt("button", { type: "submit" }, "Add comment")
    )
  );
}

/*
Comments are simple to render.
*/

function renderComment(comment) {
  return elt(
    "p",
    { className: "comment" },
    elt("strong", null, comment.author),
    ": ",
    comment.message
  );
}

/*
Finally, the form that the user can use to create a new talk is rendered like this:
*/

function renderTalkForm(dispatch) {
  let title = elt("input", { type: "text" });
  let summary = elt("input", { type: "text" });

  return elt(
    "form",
    {
      onsubmit(event) {
        event.preventDefault();
        dispatch({
          type: "newTalk",
          title: title.value,
          summary: summary.value,
        });
        event.target.reset();
      },
    },
    elt("h3", null, "Submit a Talk"),
    elt("label", null, "Title: ", title),
    elt("label", null, "Summary: ", summary),
    elt("button", { type: "submit" }, "Submit")
  );
}

// POLLING

/*
To start the app we need the current list of talks. Since the initial load is closely related to the long polling process—the `ETag` from the load must be used when polling—we’ll write a function that keeps polling the server for `/talks` and calls a callback function when a new set of talks is available.

This is an `async` function so that looping and waiting for the request is easier. It runs an infinite loop that, on each iteration, retrieves the list of talks—either normally or, if this isn’t the first request, with the headers included that make it a long polling request.

When a request fails, the function waits a moment and then tries again. This way, if your network connection goes away for a while and then comes back, the application can recover and continue updating. The promise resolved via `setTimeout` is a way to force the async function to wait.

When the server gives back a `304` response, that means a long polling request timed out, so the function should just immediately start the next request. If the response is a normal `200` response, its body is read as JSON and passed to the callback, and its `ETag` header value is stored for the next iteration.
*/

async function pollTalks(update) {
  let tag = undefined;

  while (true) {
    let response;

    try {
      response = await fetchOK("/talks", {
        headers: tag && {
          "If-None-Match": tag,
          Prefer: "wait=90",
        },
      });
    } catch (error) {
      console.error("Request failed: ", error);
      await new Promise((resolve) => setTimeout(resolve, 500));
      continue;
    }

    if (response.status === 304) continue;
    tag = response.headers.get("ETag");
    update(await response.json());
  }
}

// THE APPLICATION

/*
The following component ties the whole user interface together:

When the talks change, this component redraws all of them. This is simple but also wasteful. We’ll get back to that in the exercises.
*/

class SkillShareApp {
  constructor(state, dispatch) {
    this.dispatch = dispatch;
    this.talkDOM = elt("div", { className: "talks" });
    this.dom = elt(
      "div",
      null,
      renderUserField(state.user, dispatch),
      this.talkDOM,
      renderTalkForm(dispatch)
    );
    this.syncState(state);
  }

  syncState(state) {
    if (state.talks == this.talks) return;

    this.talkDOM.textContent = "";
    for (let talk of state.talks) {
      this.talkDOM.appendChild(renderTalk(talk, this.dispatch));
    }
    this.talks = state.talks;
  }
}

/*
We can start the application like this.

If you run the server and open two browser windows for http://localhost:8000 next to each other, you can see that the actions you perform in one window are immediately visible in the other.
*/

function runApp() {
  let user = localStorage.getItem("userName") || "Anon";
  let state;
  let app;

  function dispatch(action) {
    state = handleAction(state, action);
    app.syncState(state);
  }

  pollTalks((talks) => {
    if (app) {
      dispatch({ type: "setTalks", talks });
      return;
    }

    state = { user, talks };
    app = new SkillShareApp(state, dispatch);
    document.body.appendChild(app.dom);
  }).catch(reportError);
}

runApp();

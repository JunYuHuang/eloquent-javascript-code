# Notes

## Specs

- full-stack CRD app with client-server architecture
- no database; all backend data is stored in cache / memory only
- client refreshes its data from server via HTTP long polling
- long polling = client regularly sends GET requests to the server
- caching via `ETag` and `If-None-Match` HTTP headers
  - TLDR: server sends updated resource to client only if client's resource is outdated (client version < server version)
  - server sends responses to client with `ETag` value
  - `ETag` value is the server's latest version of the resource
  - client sends requests to server with `If-None-Match` value
  - `If-None-Match` value is the client's latest version of the resource
- client sends poll requests with a `Prefer: wait=90` header value
  - `Prefer: wait=90` header separates poll request from normal requests
  - `Prefer: wait=90` value tells server client will wait up to 90 seconds for a response
- no authorization or access control; anyone can comment, modify talks, or delete them

## API Routes

```
GET     /talks (gets all talks each with their own comments)
GET     /talks/:id (gets a talk with its comments)
PUT     /talks/:id (creates or updates a talk)
DELETE  /talks/:id
POST    /talks/:talkId/comments
```

Notes:

- All routes are RESTful and return JSON responses.
- Each talk's unique id (i.e. talk id) is its `title` URI encoded as a string.

## (Resource) Data Models

Models:

- Talk
- Comment

Note that the models are stored only in memory and do not have associated database tables.

### `Talk` Model

```
title:string
presenter:string
summary:text
comments:Comment[]

has_many comments
```

### `Comment` Model

```
author:string
message:text

belongs_to talk
```

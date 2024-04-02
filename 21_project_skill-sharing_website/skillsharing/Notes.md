# Notes

## Specs

- full-stack CRD app with client-server architecture
- no database; all backend data is stored in cache / memory only
- client refreshes its data from server via HTTP long polling
- long polling = client regularly sends GET requests to the server
- how the long polling works:
  - TLDR: server sends updated resource to client only if client's resource is outdated (client version != server version)
  - `ETag`: HTTP response header set to the server's latest version of the resource
  - `If-None-Match`: HTTP request header set to the client's latest version of the resource
  - `Prefer: wait=90`: HTTP request header that tells server that client will wait up to 90 seconds for a response
  - server POV
    - if client sends it a normal `GET /talks` request,
      - reply with
        - 200
        - headers: `Content-Type`, `ETag`, `Cache-Control`
        - `talks` JSON body payload
    - if client sends it a `GET /talks` poll request,
      - if no changes occur after 90+ seconds,
        - reply with 304 and `Content-Type: text/plain` header
      - if there are changes before 90 seconds are up,
        - reply with
          - 200
          - headers: `Content-Type`, `ETag`, `Cache-Control`
          - `talks` JSON body payload
  - client POV
    - client sends normal GET or poll request to server
      - if poll request, include `If-None-Match` & `Prefer` headers
    - if server fails to respond, client restarts poll request after half a second (500 ms)
    - if server responds with 304, client restarts poll request cycle
    - if server responds with 200, client updates / syncs its local state with the JSON response body and then restarts poll request cycle
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

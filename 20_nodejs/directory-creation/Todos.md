# Todos

- [x] Update the file server project with a handler for the HTTP `MKCOL` method
  - [x] Use the `DELETE` method handler as a starting template
  - [x] Creates a directory using `node:fs.mkdir()`
  - [x] If there is no file found, create a directory with `mkdir`
  - [x] If the directory exists at that path, return a HTTP 204 response.
  - [x] If a non-directory file exists here, return an HTTP 400 response.

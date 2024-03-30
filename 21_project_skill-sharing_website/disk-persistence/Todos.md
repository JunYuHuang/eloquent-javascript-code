# Todos

- [x] Update the Skillsharing server (`server.ts`) to able to store and load its `talks` from long-term storage
  - [x] Server saves its `talks` data in a `./talks.json` JSON file whenever the `talks` data is updated (new talk, updated talk, deleted talk, or new comment on the talk)
  - [x] Server tries to load its `talks` data from a `./talks.json` JSON file
    - [x] If the file does not exist, do nothing
    - [x] Update server's state if the file exists
- [x] Make it work in build (transpiled to JS) mode

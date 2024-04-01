# Notes

## Problem

- Comment form is re-rendered when its talk is updated (e.g. the talk gets a new comment from a different user).
- If a user was typing in the comment form and a different user submitted a new comment to the same talk, the first user's not-yet-sent comment gets lost and the user loses the keyboard focus to the comment form.
- Client-side rendering problem.

## Questions

- How to preserve the user's not-yet-send comment for a talk between talk re-renders?
- How does the comment form render work on the client?
- How does the client store its local state (i.e. its state structure)?
- What does the `SkillShareApp` class's `syncState()` method do?
- How does the `SkillShareApp` class's `syncState()` method work?
- How to make the Talk component stateful as an object with a `syncState` function that preserves the user's local comment message between re-renders?

## Answers

- Create `TalkComponent` object that
  - has a `syncState()` method
  - `syncState()` method does?
    - TODO
  - only updates when `syncState()` is called
  - `syncState()` should be called only when
    - a new comment is added to it
    - the talk is deleted
    - the talk body is replaced or updated
- keep a hashmap `talkToComponent` in state that maps each talk's title string to its associated talk component

# Todos

- [x] Preserve the `CommentForm` component part of the `Talk` component so that its input text content and focus is not lost when the `Talk` component is updated
  - [x] Update the `CommentForm` component so that:
    - [x] It clears its input text content when the user submits their message.
    - [x] It is removed / re-rendered only when its parent `Talk` component is deleted.
    - [x] It always keeps the focus on its input text content
    - [x] It keeps its input text content even when its parent `Talk` component is updated (excluding when the `Talk` component is deleted).

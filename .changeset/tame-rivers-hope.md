---
"@formity/react": minor
"@formity/system": minor
---

- Refractored codebase for improved readability and maintainability.
- Renamed `Flow` type to `State` for improved clarity and alignment with its purpose.
- Renamed properties of the `State` type:
  - `cursors` -> `points`
  - `entries` -> `inputs`
- Updated function names:
  - `getFlow` -> `getState`
  - `setFlow` -> `setState`
- Renamed the `initialFlow` prop in the `Formity` component to `initialState` for consistency with the updated naming conventions.

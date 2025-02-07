# @formity/react

## 0.3.1

### Patch Changes

- Solved bug about nextState being called twice in strict mode

## 0.3.0

### Minor Changes

- Refractored codebase for improved readability and maintainability.
- Renamed `Flow` type to `State` for improved clarity and alignment with its purpose.
- Renamed properties of the `State` type:
  - `cursors` -> `points`
  - `entries` -> `inputs`
- Updated function names:
  - `getFlow` -> `getState`
  - `setFlow` -> `setState`
- Renamed the `initialFlow` prop in the `Formity` component to `initialState` for consistency with the updated naming conventions.

### Patch Changes

- Updated dependencies
  - @formity/system@0.3.0

## 0.2.1

### Patch Changes

- Updated README.md
- Updated dependencies
  - @formity/system@0.2.1

## 0.2.0

### Minor Changes

- The switch element has been introduced

### Patch Changes

- Updated dependencies
  - @formity/system@0.2.0

## 0.1.0

### Minor Changes

- Created @formity/react

### Patch Changes

- Updated dependencies
  - @formity/system@0.1.0

# @formity/react

## 1.0.3

### Patch Changes

- Update README.md file
- Updated dependencies
  - @formity/system@1.0.3

## 1.0.2

### Patch Changes

- Update README.md file
- Updated dependencies
  - @formity/system@1.0.2

## 1.0.1

### Patch Changes

- Update README.md file
- Updated dependencies
  - @formity/system@1.0.1

## 1.0.0

### Major Changes

- This release is a version bump from 0.5.0 to 1.0.0. Although no changes in functionality have been made, we believe the project has reached a level of maturity and stability suitable for production use. All features and behaviors remain as in 0.5.0, and this version number now signals a stable API.

### Patch Changes

- Updated dependencies
  - @formity/system@1.0.0

## 0.5.0

### Minor Changes

- Renamed ReturnValues and YieldValues to ReturnOutput and YieldOutput
- Exported additional Formity types

### Patch Changes

- Updated dependencies
  - @formity/system@0.5.0

## 0.4.1

### Patch Changes

- Allow users to submit values that are not handled by the values function (it is needed if we want to jump to specific steps)
- Updated dependencies
  - @formity/system@0.4.1

## 0.4.0

### Minor Changes

- Updated Yield schema element to yield values when navigating to previous steps

### Patch Changes

- Updated dependencies
  - @formity/system@0.4.0

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

# @formity/system

## 1.0.1

### Patch Changes

- Update README.md file

## 1.0.0

### Major Changes

- This release is a version bump from 0.5.0 to 1.0.0. Although no changes in functionality have been made, we believe the project has reached a level of maturity and stability suitable for production use. All features and behaviors remain as in 0.5.0, and this version number now signals a stable API.

## 0.5.0

### Minor Changes

- Renamed functions to getInitialState, getNextState and getPreviousState
- Renamed ReturnValues and YieldValues to ReturnOutput and YieldOutput
- Exported additional Formity types

## 0.4.1

### Patch Changes

- Allow users to submit values that are not handled by the values function (it is needed if we want to jump to specific steps)

## 0.4.0

### Minor Changes

- Updated Yield schema element to yield values when navigating to previous steps

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

## 0.2.1

### Patch Changes

- Updated README.md

## 0.2.0

### Minor Changes

- The switch element has been introduced

## 0.1.0

### Minor Changes

- Created @formity/system

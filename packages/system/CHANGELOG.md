# @formity/system

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

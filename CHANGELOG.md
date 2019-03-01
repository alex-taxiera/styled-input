# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2019-02-28
### Added
- Tons of style props to StyledInput.
  - Override everything with css-in-js instead of css classes.
## Changed
- Switched _back_ to scss modules, and now rely on style and color props passed into StyledInput to modify things [BREAKING].
  - Stylesheet overriding will not work anymore, modules use dynamic class names so those cannot be targeted anymore
  - Pass colors (accentColor, errorColor), and css-in-js objects (wrapperStyle, inputStyle, etc) to style things.

## [1.1.0] - 2019-02-26
### Added
- This changelog.
- More state management to `useForm`.
  - `useForm` can now indicate if the form is properly completed with `isComplete` (check Changed for more info).
- Additional styling on the example page.
- Github links to example page.
### Changed
- Switched scss styling from module to normal classes, this allows easy css overriding.
- StyledInput `value` state management is handled by the parent now.
- StyledInput now uses Error objects for the `error` state.
- Example manifest file.
- `useForm` signature changed [BREAKING].
  - `useForm` now takes two arguments, a state object and then the callback.
  - State object should just be mapping field names to an object containing `value` (default value), and `isRequired` a bool stating the field is required.
### Removed
- Herobrine

## [1.0.0] - 2019-02-25
### Added
- Original code ported from other projects.
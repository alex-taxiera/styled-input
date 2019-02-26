# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
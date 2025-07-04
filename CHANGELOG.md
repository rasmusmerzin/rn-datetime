# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0),
and this project adheres to
[Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning).

> Due to the migration from GitHub to GitLab and then back to GitHub, tags
> v1.0.2, v1.1.0, v1.1.1 and v1.2.2 could not be restored. Luckily, the changes
> in those versions were not significant and rest of the history is intact.

## [Unreleased]

## [1.4.3] - 2025-07-04

### Added

- Date picker month transition animation

## [1.4.2] - 2025-07-03

### Added

- Modal scale animations
- Time picker cursor animations

## [1.4.1] - 2025-06-29

### Fixed

- Fixed premature state reset in DatePicker when closing

### Removed

- Removed modal compatibility layer for web as it is now built into React Native

## [1.4.0] - 2025-06-29

### Added

- Support for native dark mode (recompute styles on theme change)
- Support for overriding native color theme for TimePicker and DatePicker
  components using the `colorOverride` property which can be either `undefined`,
  "light", "dark", a record of color names to hex values, or an object with two
  properties `light` and `dark` which are both records of color names to hex
  values. See type declarations in [`src/color.ts`](./src/color.ts) for more
  details.
- Small fade-in for modal in web build which matches the native behavior

### Fixed

- Solved edge case where calendar first day of month would be rendered on top of
  weekday labels due to week starting with monday.

### Updated

- Updated dependencies
- Improved overall state management (removed many memo and useCallback calls)

## [1.3.3] - 2025-06-29

### Fixed

- Fixed broken GitLab links in README.md

## [1.3.2] - 2025-06-29

### Updated

- Migrated from Jest to Vitest

## [1.3.1] - 2025-06-29

### Added

- GitHub Actions for building and deploying the web build of example demo

### Updated

- Updated dependencies

## [1.3.0] - 2025-03-18

### Updated

- Migrated from Yarn to NPM
- Updated dependencies

## [1.2.3] - 2021-02-25

### Fixed

- Accessing months with fraction day count (getMonthDays)

## ~1.2.2~ - 2021-02-22

### Fixed

- NaiveDate toLocaleDate method

## [1.2.1] - 2021-02-22

### Added

- Memoization. In hindsight, this was premature optimization and is as of now
  (v1.4.0) reverted.

## [1.2.0] - 2021-02-22

### Added

- Minimal support for React Native Web

## ~1.1.1~ - 2021-02-18

### Fixed

- Year picker UX

## ~1.1.0~ - 2021-02-17

### Added

- Year picker in DatePicker

## ~1.0.2~ - 2021-02-16

### Fixed

- DatePicker weekday styling

## [1.0.1] - 2021-02-16

### Fixed

- Picker view reset on close

## [1.0.0] - 2021-02-16

- Initial release

[unreleased]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.4.3...master
[1.4.3]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.4.2...v1.4.3
[1.4.2]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.4.1...v1.4.2
[1.4.1]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.4.0...v1.4.1
[1.4.0]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.3.3...v1.4.0
[1.3.3]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.3.2...v1.3.3
[1.3.2]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.3.1...v1.3.2
[1.3.1]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.3.0...v1.3.1
[1.3.0]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.2.3...v1.3.0
[1.2.3]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.2.1...v1.2.3
[1.2.1]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.2.0...v1.2.1
[1.2.0]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.0.1...v1.2.0
[1.0.1]: https://gitlab.com/rasmusmerzin/rn-datetime/compare/v1.0.0...v1.0.1
[1.0.0]: https://gitlab.com/rasmusmerzin/rn-datetime/tree/v1.0.0

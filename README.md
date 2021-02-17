<h1>
RN DateTime
<br />
<a href="https://www.npmjs.com/package/rn-datetime">
<img src="https://img.shields.io/npm/l/rn-datetime.svg" alt="License">
</a>
<a href="https://www.npmjs.com/package/rn-datetime">
<img src="https://img.shields.io/npm/v/rn-datetime.svg" alt="Version">
</a>
<a href="https://npmcharts.com/compare/rn-datetime?minimal=true">
<img src="https://img.shields.io/npm/dm/rn-datetime.svg" alt="Downloads">
</a>
</h1>

Platform agnostic date & time pickers for React Native.
This project has been tested with Expo on iOS and Android but doesn't yet support React Native Web.

These are simple implementations written in Typescript that mimic Google Calendar's date & time pickers.

This project also includes
[NaiveDate](https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/src/NaiveDate.ts) &
[NaiveTime](https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/src/NaiveTime.ts) types
which do not include timezone and can be converted into ES Date type (inheriting local timezone).

## Demos

> These demos are recorded in GMT+02:00.

- [Portrait Demo](https://gitlab.com/rasmusmerzin/rn-datetime/-/raw/master/demo-portrait.gif)
- [Landscape Demo](https://gitlab.com/rasmusmerzin/rn-datetime/-/raw/master/demo-landscape.gif)

## Installation

Add this package to a React Native project with

- `expo install rn-datetime` or
- `yarn add rn-datetime` or
- `npm install rn-datetime`

For usage check [`example`](https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/example) directory.

## Roadmap

- `1.2.0` Add support for React Native Web by implementing modal for web.
- `1.2.x` Improve performance with memoization (and possibly with pure components).
- `1.3.0` Add support for theming or styling

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

Platform agnostic date & time pickers for React Native. This project has been tested with Expo on iOS and Android.

These are simple implementations written in Typescript that mimic Google Calendar's date & time pickers.

This project also includes
[NaiveDate](https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/src/NaiveDate.ts) &
[NaiveTime](https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/src/NaiveTime.ts) types
which do not include timezone and can be converted into ES Date type (inheriting local timezone).

## Demos

<img alt="Portrait Demo" src="https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/demo-portrait.gif" height='400' />
<img alt="Landscape Demo" src="https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/demo-landscape.gif" width='400' />

> These demos are recorded in GMT+02:00.

## Installation

Add this package to a React Native project with

- `expo install rn-datetime` or
- `yarn add rn-datetime` or
- `npm install rn-datetime`

For usage check [`example`](https://gitlab.com/rasmusmerzin/rn-datetime/-/blob/master/example) directory.

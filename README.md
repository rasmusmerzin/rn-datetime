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
This project has been tested with Expo on iOS and Android.
Support for React Native Web is currently minimal.

These are simple implementations written in Typescript that mimic Google Calendar's date & time pickers.

This project also includes
[NaiveDate](https://github.com/rasmusmerzin/rn-datetime/blob/main/src/NaiveDate.ts) &
[NaiveTime](https://github.com/rasmusmerzin/rn-datetime/blob/main/src/NaiveTime.ts) types
which do not include timezone and can be converted into ES Date type (inheriting local timezone).

A demo is exported as a web app and can be viewed at
[rasmusmerzin.github.io/rn-datetime](https://rasmusmerzin.github.io/rn-datetime).

## Screencasts

<div>
  <img src="./screenshots/datepicker.gif" alt="Date Picker" width="300" />
  <img src="./screenshots/timepicker.gif" alt="Time Picker" width="300" />
</div>

## Screenshots

### Date Picker

<div>
  <img src="./screenshots/datepicker-portrait-light.jpg" alt="Date Picker Portrait Light" width="300" />
  <img src="./screenshots/datepicker-portrait-dark.jpg" alt="Date Picker Portrait Dark" width="300" />
</div>

![Date Picker Landscape Light](./screenshots/datepicker-landscape-light.jpg)
![Date Picker Landscape Dark](./screenshots/datepicker-landscape-dark.jpg)

### Time Picker

<div>
  <img src="./screenshots/timepicker-portrait-light.jpg" alt="Time Picker Portrait Light" width="300" />
  <img src="./screenshots/timepicker-portrait-dark.jpg" alt="Time Picker Portrait Dark" width="300" />
</div>

![Time Picker Landscape Light](./screenshots/timepicker-landscape-light.jpg)
![Time Picker Landscape Dark](./screenshots/timepicker-landscape-dark.jpg)

## Installation

Add this package to a React Native project with

- `expo install rn-datetime` or
- `yarn add rn-datetime` or
- `npm install rn-datetime`

For usage check [`example`](https://github.com/rasmusmerzin/rn-datetime/blob/main/example) directory.

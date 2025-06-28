#!/bin/bash

cd "$(dirname "$(dirname "$(readlink -f "$0")")")" || exit 1

if [ -f package-lock.json ]
then npm run prepare
else npm install
fi

cd example
[ -f package-lock.json ] || npm install
rm -rf node_modules/rn-datetime/dist
cp -r ../dist node_modules/rn-datetime/dist
npm start

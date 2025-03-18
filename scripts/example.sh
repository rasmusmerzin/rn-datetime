#!/bin/bash

if [ -f package-lock.json ]
then npm run prepare
else npm install
fi

cd "example/$1"
[ -f package-lock.json ] || npm install
rm -rf node_modules/rn-datetime/dist
cp -r ../dist node_modules/rn-datetime/dist
npm start

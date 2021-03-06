#!/bin/bash

set -e
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo "\"${last_command}\" exited with code $?."' EXIT

if [ -f yarn.lock ]
then yarn
else yarn prepare
fi

cd "example/$1"
[ -f yarn.lock ] || yarn
rm -rf node_modules/rn-datetime/dist
cp -r ../dist node_modules/rn-datetime/dist
yarn start

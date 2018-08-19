#!/bin/sh
set -eux
yarn run lint
yarn run test-no-cache
cd ios

cd -


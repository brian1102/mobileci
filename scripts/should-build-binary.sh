#!/bin/sh
set -eu

cd ios

git fetch --tags

VERSION_BASE="$(git describe --long --tags | sed 's/-.*//')"
BUILD_NUMBER="$(git rev-list --count HEAD)"

xcrun agvtool new-marketing-version "$VERSION_BASE$BUILD_NUMBER"
xcrun agvtool new-version -all $(git rev-list --count HEAD)

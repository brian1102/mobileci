#!/bin/sh
set -eu

cd ios

xcrun agvtool new-marketing-version $(git describe --long --tags | sed 's/-.*//')
xcrun agvtool new-version -all $(git rev-list --count HEAD)

cd ..

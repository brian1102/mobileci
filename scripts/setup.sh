#!/bin/sh
set -eux

yarn install
npm install --global bugsnag-sourcemaps
brew update
brew install yarn watchman
brew cask install react-native-debugger

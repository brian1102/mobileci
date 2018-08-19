#!/bin/sh
API_KEY="f02d37dbdeb099147c6705a5e381963b";
VERSION="$(/usr/libexec/PlistBuddy -c "print 'CFBundleShortVersionString'" ios/DriveYojee/Info.plist)"

OUTPUT_MAP=bundle/index.ios.bundle.map
OUTPUT_MIN=bundle/index.ios.bundle
OUTPUT_META=bundle/index.ios.bundle.meta

pwd
rm -rf bundle
mkdir bundle
exec > bundle/ios.upload-source.map.log


react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.ios.js \
    --bundle-output $OUTPUT_MIN \
    --sourcemap-output $OUTPUT_MAP

bugsnag-sourcemaps upload --api-key $API_KEY \
    --app-version ${VERSION// } \
    --minified-url main.jsbundle \
    --source-map $OUTPUT_MAP \
    --minified-file $OUTPUT_MIN \
    --overwrite \
    --upload-sources \
    --add-wildcard-prefix 

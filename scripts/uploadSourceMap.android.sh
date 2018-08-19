#!/bin/sh
API_KEY="f02d37dbdeb099147c6705a5e381963b";
VERSION="$(git describe --long --tags)"

OUTPUT_MAP=bundle/index.android.bundle.map
OUTPUT_MIN=bundle/index.android.bundle
OUTPUT_META=bundle/index.android.bundle.meta

pwd
rm -rf bundle
mkdir bundle
exec > bundle/android.upload-source.map.log

react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.android.js \
    --bundle-output $OUTPUT_MIN \
    --sourcemap-output $OUTPUT_MAP

bugsnag-sourcemaps upload --api-key $API_KEY \
    --app-version ${VERSION// } \
    --minified-url index.android.bundle \
    --source-map $OUTPUT_MAP \
    --minified-file $OUTPUT_MIN \
    --overwrite \
    --upload-sources \
    --add-wildcard-prefix 
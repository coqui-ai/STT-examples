#!/bin/bash

set -xe

THIS=$(dirname "$0")

pushd ${THIS}
  source ../tests.sh

  npm install $(get_npm_package_url)
  npm install

  DEEPSPEECH_MODEL=$HOME/STT/models node ./start.js $HOME/STT/audio/2830-3980-0043.wav

popd

#!/bin/bash

set -xe

THIS=$(dirname "$0")

pushd ${THIS}
  source ../tests.sh

  npm install $(get_npm_package_url)
  npm install

  ln -s $HOME/STT/models models

  node index.js $HOME/STT/audio/2830-3980-0043.wav
  node index.js $HOME/STT/audio/8455-210777-0068.wav
  node index.js $HOME/STT/audio/4507-16021-0012.wav
popd

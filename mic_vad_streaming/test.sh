#!/bin/bash

set -xe

THIS=$(dirname "$0")

pushd ${THIS}
  source ../tests.sh

  pip install --user $(get_python_wheel_url "$1")
  pip install --user -r <(grep -v stt requirements.txt)

  pulseaudio &

  python mic_vad_streaming.py \
	  --model $HOME/STT/models/coqui-stt-0.9.3-models.pbmm \
	  --scorer $HOME/STT/models/coqui-stt-0.9.3-models.scorer \
	  --file $HOME/STT/audio/2830-3980-0043.wav
popd

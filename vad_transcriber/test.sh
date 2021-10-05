#!/bin/bash

set -xe

THIS=$(dirname "$0")

pushd ${THIS}
  source ../tests.sh

  pip install --user $(get_python_wheel_url "$1")
  pip install --user -r <(grep -v stt requirements.txt)

  python audioTranscript_cmd.py \
	  --audio $HOME/STT/audio/2830-3980-0043.wav \
	  --aggressive 0 \
	  --model $HOME/STT/models/

  python audioTranscript_cmd.py \
	  --audio $HOME/STT/audio/2830-3980-0043.wav \
	  --aggressive 0 \
	  --model $HOME/STT/models/ \
	  --stream
popd

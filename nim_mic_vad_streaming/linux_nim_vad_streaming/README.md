# MICROPHONE VAD STREAMING
Minimalistic example to demonstrate the STT streaming  API in NIM.Raw audio is streamed from microphone to the STT based on VAD (voice Activity Detection).

## Prerequisites:
0) Please read ``PREREQUISITES`` in [README](../README.md)  for getting the required ``libstt.so`` shared library.
1) This example depends on the ``libasound.so``(which is distributed along with all major linux distros and present in linker's default path)

_Note:  You may need to install ``libasound.so``  if not found_
```
sudo apt-get install libasound2
```

2) Download a pre-trained model and scorer from the [Coqui Model Zoo](https://coqui.ai/models)

## Installation

1. Install Nim bindings for deespeech version-0.7.0 .
```nim
nimble install https://gitlab.com/eagledot/nim-stt@0.7.0
```

2. Install Nim bindings for ALSA-lib C which is  needed for microphone access.
```nim
nimble install alsa
```

OR

```nim
nimble install https://gitlab.com/eagledot/nim-alsa
```

3. Install Webrtcvad library for Voice Activity Detection(VAD engine).
```nim
nimble install webrtcvad
```  
OR

```nim
nimble install https://gitlab.com/eagledot/nim-webrtcvad
```

4.  Install Wav library for reading and writing .wav files.

_Note: This lib is optional and is needed only  for saving recorded audio as ``.wav`` files._
```nim
nimble install https://gitlab.com/eagledot/nim-wav
```

## BUILD:
*  Build the executable/binary as such:
```nim
nim c -f -d:release --threads:on vad_stream.nim
```

## Usage:
* Using ``--saveWav`` flag is optional ,it will save the recorded audio as `.wav` files. 
``` nim 
./vad_stream --model:<path/to/pretrained/model.tflite>  --scorer:<path/to/scorer.scorer>  --saveWav
```






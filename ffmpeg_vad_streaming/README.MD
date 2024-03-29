# FFmpeg VAD Streaming

Streaming inference from arbitrary source (FFmpeg input) to STT, using VAD (voice activity detection). A fairly simple example demonstrating the STT streaming API in Node.js.

This example was successfully tested with a mobile phone streaming a live feed to a RTMP server (nginx-rtmp), which then could be used by this script for near real time speech recognition.

## Installation

```bash
npm install
```

Moreover FFmpeg must be installed:

```bash
sudo apt-get install ffmpeg
```

## Usage

Here is an example for a local audio file:
```bash
node ./index.js --audio <AUDIO_FILE> \
                --model $HOME/models/model.tflite
```

Here is an example for a remote RTMP-Stream:
```bash
node ./index.js  --audio rtmp://<IP>:1935/live/teststream \
                 --model $HOME/models/model.tflite
```

## Examples
Real time streaming inference with STT's example audio ([audio-0.4.1.tar.gz](https://github.com/coqui-ai/STT/releases/download/v0.4.1/audio-0.4.1.tar.gz)).
```bash
node ./index.js --audio $HOME/audio/2830-3980-0043.wav \
                --scorer $HOME/models/kenlm.scorer \
                --model $HOME/models/model.tflite
```
```bash
node ./index.js --audio $HOME/audio/4507-16021-0012.wav \
                --scorer $HOME/models/kenlm.scorer \
                --model $HOME/models/model.tflite
```
```bash
node ./index.js --audio $HOME/audio/8455-210777-0068.wav \
                --scorer $HOME/models/kenlm.scorer \
                --model $HOME/models/model.tflite
```
Real time streaming inference in combination with a RTMP server.
```bash
node ./index.js --audio rtmp://<HOST>/<APP>/<KEY> \
                --scorer $HOME/models/kenlm.scorer \
                --model $HOME/models/model.tflite
```

## Notes
To get the best result mapped on to your own scenario, it might be helpful to adjust the parameters `VAD_MODE` and `DEBOUNCE_TIME`.

# STT WebAssembly example

This is an example of STT running in a web page and processing audio files.

## Install

Install NPM modules (only used to serve the web page):

```
npm install
```

Download the latest version of the STT library:

```
npm run download
```

(Optional) Download a pre-trained model and scorer from the [Coqui Model Zoo](https://coqui.ai/models) to the root of the project:

```
mkdir models
cd models
mv $HOME/Downloads/model.tflite .
mv $HOME/Downloads/huge-vocab.scorer .
cd ..
```

## Run

Serve the demo:

```
npm run start
```

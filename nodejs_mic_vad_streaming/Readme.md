# NodeJS Microphone VAD Streaming

This is a NodeJS example of recording from the microphone and streaming to
STT with voice activity detection.

### Prerequisites:

1) The example utilized the [mic](https://github.com/ashishbajaj99/mic) NPM module which requires
either [sox](http://sox.sourceforge.net/) (Windows/Mac) or [arecord](http://alsa-project.org/) (Linux).

2) Download a pre-trained model and scorer from the [Coqui Model Zoo](https://coqui.ai/models)

#### Dependency

Is needed the library **libasound2-dev**

```
$ sudo apt-get install libasound2-dev
```

#### Install:

```
npm install
```

#### Run NodeJS server:

```
node start.js
```

#### Specify alternate STT model path:

Use the `STT_MODEL` environment variable to change models.

```
STT_MODEL=~/dev/jaxcore/coqui-stt-models/ node start.js
```
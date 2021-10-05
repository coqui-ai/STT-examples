# NodeJS voice recognition example using Coqui STT

Download a pre-trained model and scorer from the [Coqui Model Zoo](https://coqui.ai/models)

Edit references to models path if necessary:

```
let modelPath = './models/model.tflite';
let scorerPath = './models/huge-vocab.scorer';
```

Install SoX (for .wav file loading):

```
brew install sox
```

Download test audio files:

```
wget https://github.com/coqui-ai/STT/releases/download/v1.0.0/audio-1.0.0.tar.gz
tar xfvz audio-1.0.0.tar.gz
```

Install NPM dependencies:

```
npm install
```

Run:

```
node index.js
```

Result should be something like:

```
audio length 1.975
result: experience proves this

```

Try other wav files with an argument:

```
node index.js audio/2830-3980-0043.wav
node index.js audio/8455-210777-0068.wav
node index.js audio/4507-16021-0012.wav
```


# STT Electron example

This is an example of STT running in an Electron app with a ReactJS front-end and processing .wav files.

## Install

Install NPM modules:

```
npm install
npm run rebuild
```

Download and extract audio files to `/public` directory

```
wget https://github.com/coqui-ai/STT/releases/download/v1.0.0/audio-1.0.0.tar.gz
tar xfvz audio-1.0.0.tar.gz -C ./public/
```

(Optional) Download a pre-trained model and scorer from the [Coqui Model Zoo](https://coqui.ai/models) to the root of the project:

```
mkdir models
cd models
mv $HOME/Downloads/model.tflite .
mv $HOME/Downloads/huge-vocab.scorer .
cd ..
```

If the files do not exist, they will be downloaded.

## Run

Run development version (Mac/Linux):

```
npm run dev
```

Run development version (Windows):

```
export BROWSER=none
npm run dev-win
```

## Package

Build distributable package (Mac/Linux):

```
npm run dist
```

Build distributable package (Windows installer):

```
export BROWSER=none
npm run dist-win
```

Test the (dmg/appimage/exe) package file that has been generated in `/dist`.

## Uninstall

The model files download to the following directories and must be deleted manually

- MacOSX: `~/Library/Application\ Support/STT-electron`
- Linux:  `~/.config/STT-electron`
- Windows: `~/AppData/Roaming/STT-electron`

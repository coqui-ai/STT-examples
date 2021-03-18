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
wget https://github.com/coqui-ai/STT/releases/download/v0.9.3/audio-0.9.3.tar.gz
tar xfvz audio-0.9.3.tar.gz -C ./public/
```

(Optional) Download or softlink STT 0.9.3 model files to the root of the project:

```
mkdir models
cd models
wget https://github.com/coqui-ai/STT/releases/download/v0.9.3/coqui-stt-0.9.3-models.pbmm
wget https://github.com/coqui-ai/STT/releases/download/v0.9.3/coqui-stt-0.9.3-models.scorer
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

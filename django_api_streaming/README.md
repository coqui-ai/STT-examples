# Django API Streaming

Implementation of an API to stream audio files for transcription in Django using the REST Framework.

## Installation

```bash
   pip install -r requirements.txt
```

## Usage

### Running using Docker

Build the image using `docker build`.

```bash
docker build --rm -f Dockerfile -t stt-django-api .
```

And run the server using `docker run`. Don't forget to mount your models where the config points to using a mounted volume.

```bash
docker run \
  --mount type=bind,src='path/to/models/dir',dst=/share/STT/models \
  stt-django-api
```

### Running in a local environment
Before you run the server, you need to update the configuration located in `stt_app/config/config.json` with the path to your desired models.

```json
{
    "stt": {
      "model" :"path/to/models/output_graph.tflite",
      "lm": "path/to/models/kenlm.scorer",
      "audiofiledir": "/path/to/tmp_dir_audio",
      "audiofilelength": "10",
      "debug": "1"
    }
}
```

Run the server in local for testing (HTTP).

```bash
   python manage.py runserver
```

Run the server in local for production (HTTP).

```bash
   python manage.py runsslserver
```

## Contributions

This project was inspired and uses modified code from:

- [ashwan1/django-deepspeech-server](https://github.com/ashwan1/django-deepspeech-server)
- [voxy/django-audio-recorder](https://github.com/voxy/django-audio-recorder)
- [higuma/web-audio-recorder-js](https://github.com/higuma/web-audio-recorder-js)

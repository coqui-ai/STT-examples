# Django API Streaming

Implementation of an API to stream audio files for transcription in Django using the REST Framework.

## Installation

.. code-block:: bash

   pip install -r requirements.txt

## Usage

Run the server in local for testing (HTTP).

.. code-block:: bash

   python manage.py runserver

Run the server in local for production (HTTP).

.. code-block:: bash

   python manage.py runsslserver

## Contributions

This project was inspired and uses modified code from:

- [ashwan1/django-deepspeech-server](https://github.com/ashwan1/django-deepspeech-server)
- [voxy/django-audio-recorder](https://github.com/voxy/django-audio-recorder)
- [higuma/web-audio-recorder-js](https://github.com/higuma/web-audio-recorder-js)
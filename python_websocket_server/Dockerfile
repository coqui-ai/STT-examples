FROM tensorflow/tensorflow:1.15.2-py3

ARG STT_CONTAINER_DIR=/opt/stt
ARG STT_MODEL_ID=english/coqui/v1.0.0-huge-vocab

# Install OS dependencies
RUN apt-get update && \
    apt-get install --no-install-recommends -y wget ffmpeg && \
    apt-get clean

# Create app directory
RUN mkdir -p ${STT_CONTAINER_DIR}

# Get pre-trained model
RUN wget -q "https://github.com/coqui-ai/STT-models/releases/download/v${STT_MODEL_ID}/model.tflite" \
         -O ${STT_CONTAINER_DIR}/model.tflite
RUN wget -q "https://github.com/coqui-ai/STT-models/releases/download/v${STT_MODEL_ID}/huge-vocabulary.scorer" \
         -O ${STT_CONTAINER_DIR}/scorer.scorer

# Install Python dependencies
RUN pip3 install --upgrade pip

COPY requirements.txt /tmp
RUN pip3 install -r /tmp/requirements.txt

# Copy code and configs
COPY stt_server ${STT_CONTAINER_DIR}/stt_server
COPY application.conf ${STT_CONTAINER_DIR}

WORKDIR ${STT_CONTAINER_DIR}

ENTRYPOINT python -m stt_server.app

const STT = require('stt');
const fs = require('fs');
const path = require('path');
const wav = require('wav');
const download = require('./download');

// return the stt model or throw if it is not found
function getModel(appDataPath, callback) {
	let modelPath = path.resolve(appDataPath, 'model.tflite');
	let scorerPath = path.resolve(appDataPath, 'huge-vocab.scorer');
	if (fs.existsSync(modelPath) && fs.existsSync(scorerPath)) {
		callback(createModel(modelPath, scorerPath));
	}
	else {
		throw new Error("No model present.");
	}
}

// create the stt model
function createModel(modelPath, scorerPath) {
	const model = new STT.Model(modelPath);
	model.enableExternalScorer(scorerPath);
	return model;
}

// create a stt stream to process a .wav file
function recognizeWav(path, model) {
	return new Promise(function(resolve, reject) {
		try {
			let modelStream = model.createStream();
			const bufferSize = 512;
			const file = fs.createReadStream(path, {highWaterMark: bufferSize});
			const reader = new wav.Reader();
			reader.on('format', function (format) {
				if (format.sampleRate !== model.sampleRate()) {
					reject(new Error('invalid sample rate: '+format.sampleRate));
				}
				reader.on('end', function () {
					const results = modelStream.finishStream();
					resolve(results);
				});
				reader.on('data', function (data) {
					modelStream.feedAudioContent(data);
				});
			});
			file.pipe(reader);
		}
		catch(e) {
			reject(e);
		}
	});
}

module.exports = {
	getModel,
	recognizeWav
};

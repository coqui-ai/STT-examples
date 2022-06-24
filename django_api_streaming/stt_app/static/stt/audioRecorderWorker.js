importScripts('/static/speech_server_main/resampler.js');
importScripts('/static/speech_server_main/WavAudioEncoder.js');

var recLength = 0;
var recBuffersL = [];
var bits = 16;
var sampleRate;
var encoder;
var resampler;

this.onmessage = function(e){
  switch(e.data.command){
    case 'init':
      init(e.data.config);
      break;
    case 'record':
      record(e.data.buffer);
      break;
    case 'exportWAV':
      exportWAV(e.data.type, e.data.doCleanup);
      break;
    case 'clear':
      clear();
      break;
  }
};

function init(config){
	var contextSampleRate = config.contextSampleRate;
	sampleRate = config.desiredSampleRate;
	encoder = new WavAudioEncoder(sampleRate, 1);
	resampler = new Resampler(contextSampleRate, sampleRate, 1, 4096);
}

function record(inputBuffer) {
	if(typeof resampler !== 'undefined'){		
		inputBuffer[0] = resampler.resampler(inputBuffer[0]);
	}
	encoder.encode(inputBuffer);
}

function exportWAV(type, doCleanup) {
	var audioBlob = encoder.finish(type, doCleanup);
	this.postMessage(audioBlob);
}

function clear() {
	encoder.cancel();
}


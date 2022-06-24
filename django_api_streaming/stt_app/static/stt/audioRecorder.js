/**
 * Record audio
 */
(function(window){
	
	function AudioRecorderObject(source) {
		var callback;
		var recording = false;
		
		this.context = source.context;
		this.node = (this.context.createScriptProcessor ||
				this.context.createJavaScriptNode).call(this.context, 4096, 2, 2);
		var worker = new Worker('/static/speech_server_main/audioRecorderWorker.js');
		
		worker.onmessage = function(e){
			var blob = e.data;
			callback(blob);
		};
		
		worker.postMessage({
			command: 'init',
			config: {
				contextSampleRate: this.context.sampleRate,
				desiredSampleRate: 16000,
			}
		});
		
		this.record = function(){
			recording = true;
		};

		this.stop = function(){
			recording = false;
		};

		this.clear = function(){
			worker.postMessage({ command: 'clear' });
		};
		
		this.exportWAV = function(cb, doCleanup){
			callback = cb;
			if (!callback) throw new Error('Unable to set callback function. Please check if provided.');

			worker.postMessage({
				command: 'exportWAV',
				type: 'audio/wav',
				doCleanup: doCleanup,
			});
		};
		
		this.node.onaudioprocess = function(e){
			if (!recording) return;


			worker.postMessage({
				command: 'record',
				buffer: [
					e.inputBuffer.getChannelData(0),
				]
			});
		};

		source.connect(this.node);
		this.node.connect(this.context.destination); //need to check if this is required.
		
	}
	
	var audioRecorder =  {

			  fromSource: function(src){
				 return new AudioRecorderObject(src);
		}
	};
	
	window.audioRecorder = audioRecorder;
	
})(window);
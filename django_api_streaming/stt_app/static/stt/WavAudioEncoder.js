(function(self) {
  var min = Math.min,
      max = Math.max;

  var setString = function(view, offset, str) {
    var len = str.length;
    for (var i = 0; i < len; ++i)
      view.setUint8(offset + i, str.charCodeAt(i));
  };

  var Encoder = function(sampleRate, numChannels) {
    this.sampleRate = sampleRate;
    this.numChannels = numChannels;
    this.numSamples = 0;
    this.dataViews = [];
  };

  Encoder.prototype.encode = function(buffer) {
    var len = buffer[0].length,
        nCh = this.numChannels,
        view = new DataView(new ArrayBuffer(len * nCh * 2)),
        offset = 0;
    for (var i = 0; i < len; ++i)
      for (var ch = 0; ch < nCh; ++ch) {
        var x = buffer[ch][i] * 0x7fff;
        view.setInt16(offset, x < 0 ? max(x, -0x8000) : min(x, 0x7fff), true);
        offset += 2;
      }
    this.dataViews.push(view);
    this.numSamples += len;
  };

  Encoder.prototype.finish = function(mimeType) {
    var dataSize = this.numChannels * this.numSamples * 2,
        view = new DataView(new ArrayBuffer(44));
    /* RIFF identifier */
    setString(view, 0, 'RIFF');
    /* RIFF chunk length */
    view.setUint32(4, 36 + this.numSamples * 2, true);
    /* RIFF type */
    setString(view, 8, 'WAVE');
    /* format chunk identifier */
    setString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, this.numChannels, true);
    /* sample rate */
    view.setUint32(24, this.sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, this.sampleRate * 2, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, this.numChannels * 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    setString(view, 36, 'data');
    view.setUint32(40, this.numSamples * 2, true);
    this.dataViews.unshift(view);
    var blob = new Blob(this.dataViews, { type: 'audio/wav' });
    this.cleanup();
    return blob;
  };

  Encoder.prototype.cancel = Encoder.prototype.cleanup = function() {
    delete this.dataViews;
  };

  self.WavAudioEncoder = Encoder;
})(self);
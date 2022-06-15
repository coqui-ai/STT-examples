//(function(){
    'use strict'

    var constraints = {
            audio : true,
    };
    var recorder = null;
    var audioStream = null;
    var audioData = null;
    var audioContext = null;
    var csrftoken = getCookie('csrftoken');
    var socket = null;
    var interval;

    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

    function protocolHandler(){
    	if($('#ws-radio').prop('checked')){
    		$('#file').prop('disabled', true);
    		$('#submitAudio').prop('disabled', true);
    	} else {
    		$('#file').prop('disabled', false);
    		$('#submitAudio').prop('disabled', false);
    	}
    }

    function initWebSocket(){
    	if(!socket){
    		socket = new WebSocket('ws://127.0.0.1:8000/dsserver/');

    		socket.onopen = function(){
    			interval = setInterval(function(){
    				recorder.exportWAV(function(blob){
    		            audioData = blob;
    		            if(socket && socket.readyState == WebSocket.OPEN){
    		            	socket.send(audioData);
    		            }
    		        }, false);
    			}, 2000);
    		}

    		socket.onmessage = function(res){
    			$('#result').text(res.data);
    		}

    		socket.onerror = function(error){
    			alert('web socket error: ' + error);
    		}

    		socket.onclose = function(e){
    			clearInterval(interval);
    			console.log('websocket closed');
    		}

    	}
    }

    function closeWebSocket(){
    	if(socket && socket.readyState != WebSocket.CLOSED){
    		socket.close();
    	}
		socket = null;
    }

    function startRecording(){
    	$("#file").val("");
    	if (navigator.mediaDevices.getUserMedia === undefined) {
    		displayError("This browser doesn't support getUserMedia.");
    	}
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream){
        	audioStream = stream;
            if(!audioContext){
                audioContext = new AudioContext();
            }
            var source = audioContext.createMediaStreamSource(stream);
            recorder = audioRecorder.fromSource(source);
            recorder.record();
            if($('#ws-radio').prop('checked') && !socket){
            	initWebSocket();
            } else if(socket){
            	closeWebSocket();
            }
        })
        .catch(function(err){
        	displayError("Error occurred while getting audio stream: " + err);
        })
    }

    function stopRecording(){
    	recorder.stop();
    	clearInterval(interval);
        recorder.exportWAV(function(blob){
            audioStream.getTracks()[0].stop();
            audioStream = null;
            audioData = blob;
            var url = URL.createObjectURL(blob);
            var mt = document.createElement('audio');
            mt.controls = true;
            mt.src = url;
            $('#player')[0].innerHTML = "";
            $('#player').append(mt);
            if(socket && socket.readyState == WebSocket.OPEN){
            	socket.send(audioData);
            	closeWebSocket();
            }
        }, true);
        recorder.clear();
    }

    function submitToServer(){
        if(audioData == null) {
            displayError("There is no audio data here!");
            return;
        }

        $('#error-panel').hide();
        $('#progress-panel').show();
        $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
        $('.progress-bar').animate({
            width: "100%"
        }, 1500);
        $.ajax({
          url: "/stt/handleaudio/",
          type: "POST",
          contentType: 'application/octet-stream',
          data: audioData,
          processData: false,
          headers: {
            'X-CSRFTOKEN': csrftoken
          },
          success: function(response){
            $('#result').text(response);
            $('#progress-panel').hide();
          },
          error: function(response){
            $('#result').text(response.responseText);
            $('#progress-panel').hide();
          }
        });
    }

    var openFile = function(event) {
        var input = event.target;
        var isValid = checkValidity(input.files[0]);
        if(!isValid){
        	displayError("Only wav file type allowed.");
        	return;
        }
        var url = URL.createObjectURL(input.files[0]);
        var mt = document.createElement('audio');
        audioData = input.files[0];
        mt.controls = true;
        mt.src = url;
        $('#player')[0].innerHTML = "";
        $('#player').append(mt);
    };
    
    function checkValidity(file){
    	var isValid = false;
    	var allowedFileTypes = ['audio/x-wav', 'audio/wav'];
    	isValid = allowedFileTypes.includes(file.type);
    	return isValid;
    }
    
    function displayError(errorMsg){
    	$('#error-panel').addClass('alert-danger');
        $('#error-message').text(errorMsg);
        $('#error-panel').show();
    }

    $(window).on('load',function(){
    	$("#file").val("");
    	$("#file").change(openFile);
    });

//})())

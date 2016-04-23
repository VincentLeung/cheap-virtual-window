var socket = io.connect();

var canvas = document.getElementById('canvas-video');
var context = canvas.getContext('2d');
var img = new Image();

// show loading notice
context.fillStyle = '#333';
context.fillText('Loading...', canvas.width/2-30, canvas.height/3);

socket.on('frame', function (data) {
  // Reference: http://stackoverflow.com/questions/24107378/socket-io-began-to-support-binary-stream-from-1-0-is-there-a-complete-example-e/24124966#24124966
  var uint8Arr = new Uint8Array(data.buffer);
  var str = String.fromCharCode.apply(null, uint8Arr);
  var base64String = btoa(str);

  img.onload = function () {
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
  };
  img.src = 'data:image/png;base64,' + base64String;
});

socket.on('disconnect', function() {
	console.log('socket disconnect');
});

socket.on('spec', function (data) {
	document.getElementById('camWidth').value = data.camWidth;
	document.getElementById('camHeight').value = data.camHeight;
	document.getElementById('camFps').value = data.camFps;
	document.getElementById('tolerancePctX').value = data.tolerancePctX;
	document.getElementById('tolerancePctY').value = data.tolerancePctY;
	var flipHorizontalCheckedIndex = (data.flipHorizontal) ? 0 : 1;
	document.specForm.flipHorizontal[flipHorizontalCheckedIndex].checked = true;
	var flipVerticalCheckedIndex = (data.flipVertical) ? 0 : 1;
	document.specForm.flipVertical[flipVerticalCheckedIndex].checked = true;
});

document.getElementById('updateSpec').onclick = function(evt){
	var spec = {
		camWidth: document.getElementById('camWidth').value,
		camHeight: document.getElementById('camHeight').value,
		camFps: document.getElementById('camFps').value,
		tolerancePctX: document.getElementById('tolerancePctX').value,
		tolerancePctY: document.getElementById('tolerancePctY').value,
		flipHorizontal: document.specForm.flipHorizontal[0].checked,
		flipVertical: document.specForm.flipVertical[0].checked
	};
	socket.emit('spec', spec);
};

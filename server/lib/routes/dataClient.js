var socket;
var connected = false;

function doInit(url) {
	socket = require('socket.io-client')(url);

	socket.on('connect', function(){
		connected = true;
		console.log('connect');
	});

	// socket.on('event', function(data){});

	socket.on('disconnect', function(){
		connected = false;
		console.log('disconnect');
	});
}
	
function doEmitPos(pos) {
	if (connected) {
		socket.emit('pos', pos);
		return true;
	}
	return false;
}

module.exports = {
	init: function(url) {
		doInit(url);
	},
	emitPos: function(pos) {
		doEmitPos(pos);
	}
};

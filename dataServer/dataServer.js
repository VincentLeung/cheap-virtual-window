var servoblaster = require('servoblaster');
var io = require('socket.io')();

var stream = servoblaster.createWriteStream(0); // Open pin 0 (optional)

var listenPort = 8086;
var yServoId = 0;
var xServoId = 1;
var minX = 50;
var maxX = 250;
var minY = 180;
var maxY = 250;
var fullY = maxY - minY;
var fullX = maxX - minX;

function convertPos(data) {
	data.y = minY + (fullY * data.y);
	data.x = minX + (fullX * data.x);
}

function driveServos(data) {
	convertPos(data);
	console.log(data);
	stream.write({ pin: yServoId, value: data.y });
	stream.write({ pin: xServoId, value: data.x });
}

io.on('connection', function(socket){
	socket.on('pos', function(data){
		driveServos(data);
	});
	socket.on('disconnect', function(){
		console.log('disconnect');
	});
});

io.listen(listenPort);
console.log("listen port: " + listenPort);

var cv = require('opencv');

var defaultSpec = { 
// camera properties
  camWidth: 320,
  camHeight: 240,
  camFps: 10,

// data conversion
  tolerancePctX: 5,
  tolerancePctY: 5,
  flipHorizontal: true,
  flipVertical: true
};

var spec = (JSON.parse(JSON.stringify(defaultSpec)));

// camera properties
var camInterval;

// face detection properties
var rectColor = [0, 255, 0];
var rectThickness = 2;

// initialize camera
var camera = new cv.VideoCapture(0);

// pos checking
var toleranceX;
var toleranceY;
var lastPos = { x: -10000, y: -10000 };

function applySpec(data) {
  Object.keys(spec).forEach(function(key) {
    if (data[key] != undefined) {
      spec[key] = data[key];
    }
  });
  camInterval = 1000 / spec.camFps;
  camera.setWidth(spec.camWidth);
  camera.setHeight(spec.camHeight);
  toleranceX = spec.tolerancePctX / 100;
  toleranceY = spec.tolerancePctY / 100;
}

function publishSpec(socket) {
  socket.emit('spec', spec);
}

function publishPos(bigFace, dataClient) {
  if (bigFace && dataClient) {
    var x = (bigFace.x + bigFace.width / 2) / spec.camWidth;
    var y = (bigFace.y + bigFace.height / 2) / spec.camHeight;
    if (spec.flipHorizontal) {
      x = 1 - x;
    }
    if (spec.flipVertical) {
      y = 1 - y;
    }
    if (Math.abs(x - lastPos.x) > toleranceX || Math.abs(y - lastPos.y) > toleranceY) {
      var pos = { x: x, y: y };
      if (dataClient.emitPos(pos)) {
        lastPos = pos;
      }
      // console.log("send pos: " + x + ", " + y);
    } else {
      // console.log("skip pos:" + x + ", " + y);
    }
  }
}

function mainTask(socket, dataClient) {
  camera.read(function(err, im) {
    if (err) throw err;

    im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
      if (err) throw err;

      var bigFace = null;
      var bigFaceArea = -1;
      for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        var faceArea = face.width * face.height;
        if (faceArea > bigFaceArea) {
          bigFaceArea = faceArea;
          bigFace = face;
        }
        im.rectangle([face.x , face.y], [face.width, face.height], rectColor, rectThickness);
      }
      if (bigFace) {
        im.ellipse(bigFace.x + bigFace.width / 2, bigFace.y + bigFace.height / 2, bigFace.width / 2, bigFace.height / 2);
      }
      if (socket) {
        socket.emit('frame', { buffer: im.toBuffer() });
      }
      publishPos(bigFace, dataClient);
    });
  });
}

module.exports = function (socket, dataClient) {
  console.log('socket connected');
  applySpec(defaultSpec);
  publishSpec(socket);
  socket.on('spec', function(data) {
    applySpec(data);
  });
  socket.on('disconnect', function() {
    socket = null;
    console.log('socket disconnect');
  });

  var intervalFunc = function(){
    mainTask(socket, dataClient);
    if (socket) {
      setTimeout(intervalFunc, camInterval);
    }
  }
  setTimeout(intervalFunc, camInterval);
};

// modules
var express = require('express')
  , http = require('http')
  , morgan = require('morgan');

// configuration files
var configServer = require('./lib/config/server');

// app parameters
var app = express();
app.set('port', configServer.httpPort);
app.use(express.static(configServer.staticFolder));
app.use(morgan('dev'));

// serve index
require('./lib/routes').serveIndex(app, configServer.staticFolder);

// HTTP server
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('HTTP server listening on port ' + app.get('port'));
});

// Data client
var dataClient = require('./lib/routes/dataClient');
dataClient.init(configServer.dataServerUrl);

// WebSocket server
var io = require('socket.io')(server);
io.on('connection', function(socket){
	require('./lib/routes/socket')(socket, dataClient);	
});

module.exports.app = app;
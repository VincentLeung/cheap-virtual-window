var path = require('path')

module.exports = {
  httpPort: 18080,
  staticFolder: path.join(__dirname + '/../../../client'),
  dataServerUrl: 'http://192.168.1.7:8086'
};
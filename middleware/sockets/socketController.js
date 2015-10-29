var spawn = require('child_process').spawn;
var HomeController = require('../home/homeController');
var fs = require('fs');
var ls;

module.exports = function (io) {
  io.of('/system').on('connection', function (socket) {
    socket.on('getlogs', function () {
      ls = ls || spawn('tail', ['-f', __dirname + "/../serverLogs/access.log"]);
      ls.stdout.on('readable', function() {
        var buffer = this.read();
        if(buffer !== null) {
          var asMessage = buffer.toString();
          socket.emit('logs', asMessage);
        }
      });  
    });
    socket.on('stoplogs', function () {
      ls.kill();
      ls.on('exit', function () {
        ls = null;
        fs.truncate(__dirname + '/../serverLogs/access.log');
      });
    });

  });

  io.of('/home').on('connection', function(socket) {
    var memoryTick, cpuTick;
    socket.on('pressure', function(){
      socket.emit('memory', HomeController.getFreeMemory());
      memoryTick = setInterval(function(){
        socket.emit('memory', HomeController.getFreeMemory());
      }, 2500);
    });
    socket.on('endpressure', function () {
      clearInterval(memoryTick);
    });
    socket.on('clientcpu', function(){
      socket.emit('servercpu', HomeController.getCpus());
      cpuTick = setInterval(function(){
        socket.emit('servercpu', HomeController.getCpus());
      }, 500);
    });
    socket.on('endclientcpu', function () {
      clearInterval(cpuTick);
    });
  });

}

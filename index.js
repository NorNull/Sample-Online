var express = require ('express');
var app = express ();
var server = require ('http').createServer (app);
var io = require ('socket.io') (server);

app.set ('port', process.env.PORT || 3000);
app.get ('/', function (req, res) {
  res.send ('Server is running');
});

var user = [];

io.on ('connection', function (socket) {
  socket.on ('connect', function (r_data) {
    user.forEach (function (item, index, array) {
      var data = {user : item ['user'], pos : r_data ['pos']};
      socket.emit ('connect', data);
    });

    var pk_data = {user : r_data ['user'], socketId : socket.id, pos : r_data ['pos']};
    user.push (pk_data);

    socket.broadcast.emit ('connect', data);
  });

  socket.on ('movement', function (r_data) {
    socket.broadcast.emit ('movement', r_data);
  });
});

const socketIO = require('socket.io');
const {
  SocketController
} = require('./app/controllers');

let io;

module.exports = {
  startSocketServer: app => {
    io = socketIO(app);

    io.on('connection', socket => {
      socket.on('username', string => {
        SocketController.connection(string, socket);
      });

      socket.on('transparent', object => {
        SocketController.sendTransparentLink(object, socket);
      });

      socket.on('disconnect', () => {
        if (socket.channel) {
          SocketController.disconnect(socket);
        };
      });
    });
  },
};
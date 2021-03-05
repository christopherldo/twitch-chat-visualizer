const BadgesController = require('./BadgesController');

let connectedChannels = [];

function sendTransparentLink(object, socket) {
  let nameBackground = object.nameBackgroundColor;
  let nameColor = object.nameTextColor;
  let messageBackground = object.messageBackgroundColor;
  let messageColor = object.messageTextColor;
  let fontSize = object.fontSize;

  let link = `/${socket.channel}/transparent/?namebackground=${nameBackground}&namecolor=${nameColor}&messagebackground=${messageBackground}&messagecolor=${messageColor}&fontsize=${fontSize}`;

  socket.emit('redirect', link)
};

// Badges Images
const getChannelBadges = (socket) => {
  BadgesController.getChannelBadges(socket);
};

module.exports = {
  connection: (string, socket) => {
    let channel = string.toLowerCase();

    socket.channel = channel;

    connectedChannels.push(channel);

    console.log(`New instance started for channel: ${channel}`);
    console.log(`Online instances: ${connectedChannels.length}`);

    getChannelBadges(socket);
  },
  disconnect: (channel) => {
    connectedChannels = connectedChannels.filter(item => item !== channel);

    console.log(`Instance closed for channel: ${channel}`);
    console.log(`Online instances: ${connectedChannels.length}`);
  },
  sendTransparentLink: (object, socket) => {
    sendTransparentLink(object, socket);
  },
};
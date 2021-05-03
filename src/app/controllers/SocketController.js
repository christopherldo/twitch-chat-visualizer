const RequestsController = require('./RequestsController');
const uuid = require('uuid');

let connectedChannels = [];

const sendTransparentLink = (object, socket) => {
  let nameBackground = object.nameBackgroundColor;
  let nameColor = object.nameTextColor;
  let messageBackground = object.messageBackgroundColor;
  let messageColor = object.messageTextColor;
  let fontSize = object.fontSize;

  let link = `/${socket.channel}/transparent/?namebackground=${nameBackground}&namecolor=${nameColor}&messagebackground=${messageBackground}&messagecolor=${messageColor}&fontsize=${fontSize}`;

  socket.emit('redirect', link)
};

const getChannelBadges = (socket) => {
  RequestsController.requestChannelAssets(socket);
};

module.exports = {
  connection: (string, socket) => {
    let channel = string.toLowerCase();
    let connectionUuid = uuid.v4();

    socket.channel = channel;
    socket.uuid = connectionUuid;

    const channelObject = {
      channel,
      uuid: connectionUuid,
    };

    connectedChannels.push(channelObject);

    let connectedChannelsArray = [];

    for(let connectedChannel of connectedChannels){
      if(connectedChannelsArray.includes(connectedChannel.channel) === false){
        connectedChannelsArray.push(connectedChannel.channel);
      };
    };

    console.log(`New instance started for channel: ${channel}`);
    console.log(`Online instances: ${connectedChannelsArray.join(', ')}`);
    console.log(`Total: ${connectedChannels.length}`);

    getChannelBadges(socket);
  },
  disconnect: (socket) => {
    let channel = socket.channel;
    let connectionUuid = socket.uuid;

    connectedChannels = connectedChannels.filter(item => item.uuid !== connectionUuid);

    let connectedChannelsArray = [];

    for(let connectedChannel of connectedChannels){
      if(connectedChannelsArray.includes(connectedChannel.channel) === false){
        connectedChannelsArray.push(connectedChannel.channel);
      };
    };

    console.log(`Instance closed for channel: ${channel}`);
    console.log(`Online instances: ${connectedChannelsArray.join(', ')}`);
    console.log(`Total: ${connectedChannels.length}`);
  },
  sendTransparentLink: (object, socket) => {
    sendTransparentLink(object, socket);
  },
};
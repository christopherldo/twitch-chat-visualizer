const tmi = require('tmi.js');
const MessageController = require('./MessageController');
const path = require('path');

module.exports = {
  index: (req, res) => {
    res.render('index', {
      pageTitle: 'Channel',
    });
  },
  setUsername: (req, res) => {
    let channel = req.body.channel;

    res.redirect(`/${channel}`);
  },
  visualizeChat: (req, res) => {
    let channel = req.params.channel;

    res.render('chat', {
      pageTitle: channel,
      channel,
    });
    console.log();
  },
  visualizeTransparentChat: (req, res) => {
    let channel = req.params.channel;

    res.render('transparent', {
      pageTitle: `${channel} transparent`,
      channel,
    });
  },
  startChat: (gBadges, cBadges, bttv, ffz, socket) => {
    let channel = socket.channel;

    let globalBadges = gBadges;
    let channelBadges = cBadges;
    let bttvObject = bttv;
    let ffzObject = ffz;

    let bttvCodes = [];
    let ffzCodes = [];

    for (let i in bttvObject) {
      bttvCodes.push(bttvObject[i].code);
    };

    for (let i in ffzObject) {
      ffzCodes.push(ffzObject[i].name);
    };

    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true
      },
      channels: [channel]
    });

    client.connect();
    console.log(`Chat started for channel '${channel}'!`);

    socket.emit('configured');

    client.on('message', (channel, tags, message, self) => {
      const badgesSource = {};

      if (tags['badges-raw']) {
        let badges = tags['badges-raw'];

        badges = badges.split(',');

        for (let i = 0; i < Object.keys(badges).length; i++) {
          badges[i] = badges[i].split('/');

          if (badges[i][0] in channelBadges['badge_sets']) {
            badgesSource[i] =
              channelBadges['badge_sets'][badges[i][0]]['versions'][badges[i][1]]['image_url_1x'];
          } else if (badges[i][0] in globalBadges['badge_sets']) {
            badgesSource[i] =
              globalBadges['badge_sets'][badges[i][0]]['versions'][badges[i][1]]['image_url_1x'];
          };
        };
      };

      message = MessageController.messageTreatment(message,
        tags,
        bttvCodes,
        bttvObject,
        ffzCodes,
        ffzObject
      );

      messageObject = {
        badges: badgesSource,
        username: tags['username'],
        message: message
      };

      socket.emit('message', messageObject);
    });

    client.on("ban", (channel, username, reason, userstate) => {
      socket.emit('ban', username);
    });

    client.on("timeout", (channel, username, reason, duration, userstate) => {
      socket.emit('timeout', username);
    });

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
      socket.emit('messagedeleted', username);
    });

    client.on("clearchat", () => {
      socket.emit('clearchat');
    });
  },
};
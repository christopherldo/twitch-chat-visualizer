const request = require('then-request');
const ChatController = require('./ChatController');

module.exports = {
  getChannelBadges: socket => {
    let channel = socket.channel;

    request('GET',
      `https://api.twitch.tv/kraken/users?login=${channel}`, {
        headers: {
          'Client-ID': process.env.CLIENT_ID,
          Accept: 'application/vnd.twitchtv.v5+json'
        }
      }).getBody('utf-8').then(JSON.parse).done((res) => {
      let channelID = res['users'][0]['_id'];

      request('GET',
          `https://badges.twitch.tv/v1/badges/channels/${channelID}/display`)
        .getBody('utf-8').then(JSON.parse).done((res) => {
          let channelBadges = res;

          request('GET',
              'https://badges.twitch.tv/v1/badges/global/display').getBody('utf-8')
            .then(JSON.parse).done((res) => {
              let globalBadges = res;

              request('GET',
                  `https://api.betterttv.net/3/cached/users/twitch/${channelID}`).getBody('utf-8')
                .then(JSON.parse).done((res) => {
                  let bttvEmotes = res['sharedEmotes'];

                  ChatController.startChat(channelBadges, globalBadges, bttvEmotes, socket);

                  socket.emit('configured');
                });
            });
        });
    });
  },
};
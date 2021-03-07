// const request = require('then-request');
const request = require('request');
const ChatController = require('./ChatController');

const getChannelID = async channel => {
  return new Promise((resolve, reject) => {
    request(`https://api.twitch.tv/kraken/users?login=${channel}`, {
      headers: {
        'Client-ID': process.env.CLIENT_ID,
        Accept: 'application/vnd.twitchtv.v5+json'
      },
    }, (err, res, body) => {
      let channelID = null;

      try {
        body = JSON.parse(body);

        channelID = body['users'][0]['_id'];
      } catch (error) {
        console.log(`Erro: ${error.message}`);
      };

      resolve(channelID);
    });
  });
};

const getGlobalBadges = async () => {
  return new Promise((resolve, reject) => {
    request(`https://badges.twitch.tv/v1/badges/global/display`,
      (err, res, body) => {
        let globalBadges = {};

        try {
          body = JSON.parse(body);

          globalBadges = body;
        } catch (error) {
          console.log(`Erro: ${error.message}`);
        };

        resolve(globalBadges);
      });
  });
};

const getChannelBadges = async channelID => {
  return new Promise((resolve, reject) => {
    request(`https://badges.twitch.tv/v1/badges/channels/${channelID}/display`,
      (err, res, body) => {
        let channelBadges = {};

        try {
          body = JSON.parse(body);

          channelBadges = body;
        } catch (error) {
          console.log(`Erro: ${error.message}`);
        };

        resolve(channelBadges);
      });
  });
};

const getBTTVEmotes = async channelID => {
  return new Promise((resolve, reject) => {
    request(`https://api.betterttv.net/3/cached/users/twitch/${channelID}`,
      (err, res, body) => {
        let bttvEmotes = {};

        try {
          body = JSON.parse(body);

          bttvEmotes = body['sharedEmotes'];
        } catch (error) {
          console.log(`Erro: ${error.message}`);
        };

        resolve(bttvEmotes);
      });
  });
};

const getFFZemote = async channelID => {
  return new Promise((resolve, reject) => {
    request(`https://api.frankerfacez.com/v1/room/id/${channelID}`,
      (err, res, body) => {
        let ffzEmotes = {};

        try {
          body = JSON.parse(body);
          body = body['sets'];

          ffzEmotes = body[Object.keys(body)[0]].emoticons;
        } catch (error) {
          console.log(`Erro: ${error.message}`);
        };

        resolve(ffzEmotes);
      });
  });
};

module.exports = {
  getChannelBadges: async socket => {
    let channel = socket.channel;
    let channelID = await getChannelID(channel).then(res => res);

    if (channelID) {
      let globalBadgesPromise = getGlobalBadges().then(res => res);
      let channelBadgesPromise = getChannelBadges(channelID).then(res => res);
      let bttvEmotesPromise = getBTTVEmotes(channelID).then(res => res);
      let ffzEmotesPromise = getFFZemote(channelID).then(res => res);

      let [globalBadges, channelBadges, bttvEmotes, ffzEmotes] = await Promise.all([
        globalBadgesPromise,
        channelBadgesPromise,
        bttvEmotesPromise,
        ffzEmotesPromise,
      ]);

      ChatController.startChat(globalBadges,
        channelBadges,
        bttvEmotes,
        ffzEmotes,
        socket
      );
    } else {
      console.log('Not found channel');
    };
  },
};
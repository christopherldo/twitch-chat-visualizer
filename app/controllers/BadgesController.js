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
      body = JSON.parse(body);
      
      let channelID = null;

      if(body['users'][0]){
        channelID = body['users'][0]['_id'];
      };

      resolve(channelID)
    });
  });
};

const getGlobalBadges = async () => {
  return new Promise((resolve, reject) => {
    request(`https://badges.twitch.tv/v1/badges/global/display`,
    (err, res, body) => {
      body = JSON.parse(body);
      
      let globalBadges = {};

      if(body){
        globalBadges = body;
      };

      resolve(globalBadges)
    });
  });
};

const getChannelBadges = async channelID => {
  return new Promise((resolve, reject) => {
    request(`https://badges.twitch.tv/v1/badges/channels/${channelID}/display`,
    (err, res, body) => {
      body = JSON.parse(body);
      
      let channelBadges = {};

      if(body){
        channelBadges = body;
      };

      resolve(channelBadges)
    });
  });
};

const getbttvEmotes = async channelID => {
  return new Promise((resolve, reject) => {
    request(`https://api.betterttv.net/3/cached/users/twitch/${channelID}`,
    (err, res, body) => {
      body = JSON.parse(body);
      
      let bttvEmotes = {};

      if(body['sharedEmotes']){
        bttvEmotes = body['sharedEmotes'];
      };

      resolve(bttvEmotes)
    });
  });
};

module.exports = {
  getChannelBadges: async socket => {
    let channel = socket.channel;
    let channelID = await getChannelID(channel).then(res => res);

    if(channelID){
      let globalBadgesPromise = getGlobalBadges().then(res => res);
      let channelBadgesPromise = getChannelBadges(channelID).then(res => res);
      let bttvEmotesPromise = getbttvEmotes(channelID).then(res => res);

      let [globalBadges, channelBadges, bttvEmotes] = await Promise.all([
        globalBadgesPromise,
        channelBadgesPromise,
        bttvEmotesPromise
      ]);

      ChatController.startChat(globalBadges, channelBadges, bttvEmotes, socket);

      socket.emit('configured');
    } else {
      console.log('Not found channel');
    };
  },
};
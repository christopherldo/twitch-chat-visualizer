const ChatController = require('./ChatController');
const axios = require('axios');
const qs = require('qs');

const axiosGET = async (url, body = {}) => {
  return await axios({
    method: 'GET',
    url: `${url}?${qs.stringify(body)}`,
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${global.access_token}`,
    },
  });
};

const getChannelID = async channel => {
  let res;

  try {
    const body = await axiosGET('https://api.twitch.tv/helix/users', {
      login: channel
    });
    
    res = body.data.data[0].id
  } catch (error) {
    console.log(`Error on const getChannelID: ${error.message}`);
  };

  return res;
};

const getGlobalBadges = async () => {
  let res;

  try {
    const body = await axiosGET('https://api.twitch.tv/helix/chat/badges/global');
    res = body.data;
  } catch (error) {
    console.log(`Error on const getGlobalBadges: ${error.message}`);
  };

  return res;
};

const getChannelBadges = async channelID => {
  let res;

  try {
    const body = await axiosGET('https://api.twitch.tv/helix/chat/badges', {
      'broadcaster_id': channelID,
    });

    res = body.data;
  } catch (error) {
    console.log(`Error on const getChannelBadges: ${error.message}`);
  };

  return res;
};

const getBTTVChannelEmotes = async channelID => {
  let res;

  try {
    const body = await axiosGET(`https://api.betterttv.net/3/cached/users/twitch/${channelID}`);
    res = [...body.data.channelEmotes, ...body.data.sharedEmotes];
  } catch (error) {
    console.log(`Error on const getBTTVChannelEmotes: ${error.message}`);
  };

  return res;
};

const getBTTVGlobalEmotes = async () => {
  let res;

  try {
    const body = await axiosGET(`https://api.betterttv.net/3/cached/emotes/global`);
    res = body.data;
  } catch (error) {
    console.log(`Error on const getBTTVGlobalEmotes: ${error.message}`);
  };

  return res;
};

const getFFZChannelEmotes = async channelID => {
  let res;

  try {
    const body = await axiosGET(`https://api.frankerfacez.com/v1/room/id/${channelID}`);
    res = body.data.sets[Object.keys(body.data.sets)[0]].emoticons;
  } catch (error) {
    console.log(`Error on const getFFZChannelEmotes: ${error.message}`);
  };

  return res;
};

const getFFZGlobalEmotes = async channelID => {
  let res;

  try {
    const body = await axiosGET(`https://api.frankerfacez.com/v1/set/global`);
    res = body.data.sets['3'].emoticons;
  } catch (error) {
    console.log(`Error on const getFFZGlobalEmotes: ${error.message}`);
  };

  return res;
};

module.exports = {
  requestChannelAssets: async socket => {
    const channel = socket.channel;
    
    const channelID = await getChannelID(channel).then(res => res);

    if (channelID) {
      const globalBadgesPromise = getGlobalBadges().then(res => res);
      const channelBadgesPromise = getChannelBadges(channelID).then(res => res);
      const bttvChannelEmotesPromise = getBTTVChannelEmotes(channelID).then(res => res);
      const bttvGlobalEmotesPromise = getBTTVGlobalEmotes().then(res => res);
      const ffzChannelEmotesPromise = getFFZChannelEmotes(channelID).then(res => res);
      const ffzGlobalEmotesPromise = getFFZGlobalEmotes(channelID).then(res => res);

      const [
        globalBadges,
        channelBadges,
        bttvChannelEmotes,
        bttvGlobalEmotes,
        ffzChannelEmotes,
        ffzGlobalEmotes
      ] = await Promise.all([
        globalBadgesPromise,
        channelBadgesPromise,
        bttvChannelEmotesPromise,
        bttvGlobalEmotesPromise,
        ffzChannelEmotesPromise,
        ffzGlobalEmotesPromise,
      ]);

      const bttv = [];
      const ffz = [];

      if(bttvChannelEmotes) bttv.push(...bttvChannelEmotes);
      if(bttvGlobalEmotes) bttv.push(...bttvGlobalEmotes);
      if(ffzChannelEmotes) ffz.push(...ffzChannelEmotes);
      if(ffzGlobalEmotesPromise) ffz.push(...ffzGlobalEmotes);

      ChatController.startChat(globalBadges, channelBadges, bttv, ffz, socket);
    } else {
      console.log('Not found channel');
    };
  },
  twitchLogin: async (id, secret) => {
    let res;

    const data = {
      'client_id': id,
      'client_secret': secret,
      'grant_type': 'client_credentials'
    };

    try {
      const body = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: `https://id.twitch.tv/oauth2/token`,
      });
      
      res = {
        access_token: body.data['access_token'],
        expires_in: body.data['expires_in'],
      };
    } catch (error) {
      console.log(`Error on const twitchLogin: ${error.message}`);
    };

    return res;
  }
};
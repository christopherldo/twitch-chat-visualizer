const fs = require('fs');
const tmi = require('tmi.js');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const request = require('then-request');

const config = require('./data/config.json');

//Webclient IO
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/static', express.static('public'));

http.listen(config.port, () => {
  console.log(`listening on localhost:${config.port}`);
});

io.on('connection', (socket) => {
  console.log('Webclient connected');
});

// Directory verifier/creator
let dir = './data';
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir)
}

// Require Configurations
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: [ config.channel ]
});

// Badges Images
function getChannelBadges(){
  request('GET', 
  `https://api.twitch.tv/kraken/users?login=${config.channel}`,
  {headers: {
    'Client-ID': config["Client-ID"],
    Accept: 'application/vnd.twitchtv.v5+json'
  }}).getBody('utf-8').then(JSON.parse).done((res) => {
    let channelID = res['users'][0]['_id'];
    
    request('GET',
    `https://badges.twitch.tv/v1/badges/channels/${channelID}/display`)
    .getBody('utf-8').then(JSON.parse).done((res) => {
      let channelBadges = res;

      request('GET',
      'https://badges.twitch.tv/v1/badges/global/display').getBody('utf-8')
      .then(JSON.parse).done((res) => {
        let globalBadges = res;

        startChat(channelBadges, globalBadges);
      });
    });
  });
};

getChannelBadges();

function startChat(channel, global){
  channelBadges = channel;
  globalBadges = global;
  client.connect();
};

client.on('message', (channel, tags, message, self) => {
  const badgesSource = {};

  if(tags['badges-raw']){
    let badges = tags['badges-raw'];

    badges = badges.split(',');

    for(let i = 0; i < Object.keys(badges).length; i++){
      badges[i] = badges[i].split('/');
      if(badges[i][0] in channelBadges['badge_sets']){
        badgesSource[i] =
          channelBadges['badge_sets'][badges[i][0]]['versions'][badges[i][1]]['image_url_1x'];
      } else if(badges[i][0] in globalBadges['badge_sets']){
        badgesSource[i] =
          globalBadges['badge_sets'][badges[i][0]]['versions'][badges[i][1]]['image_url_1x'];
      };
    };
  };

  messageObject = {
    badges: badgesSource,
    username: tags['username'],
    message: message
  };
  
  io.emit('message', messageObject);
});
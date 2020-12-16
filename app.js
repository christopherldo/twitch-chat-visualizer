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

app.get('/transparent', (req, res) => {
  res.sendFile(__dirname + '/public/transparent/index.html')
});

app.use('/static', express.static('public'));
app.use('/transparent', express.static('public'));

http.listen(config.port, () => {
  console.log(`listening on localhost:${config.port}`);
});

if (config.channel !== '<CHANNEL_NAME>') {
  setUsername(config.channel);
};

io.on('connection', (socket) => {
  console.log('Webclient connected');
  socket.on('transparent', object => {
    sendTransparentLink(object);
  });

  if (config.channel !== '<CHANNEL_NAME>') {
    if (socket.connected) {
      io.emit('configured');
    };
  } else {
    socket.on('username', string => {
      setUsername(string);
    });
  };
});

function setUsername(string) {
  config.channel = string;
  getChannelBadges();
};

function sendTransparentLink(object) {
  let nameBackground = object.nameBackgroundColor;
  let nameColor = object.nameTextColor;
  let messageBackground = object.messageBackgroundColor;
  let messageColor = object.messageTextColor;
  let fontSize = object.fontSize;

  let link = `localhost:${config.port}/transparent/?namebackground=${nameBackground}&namecolor=${nameColor}&messagebackground=${messageBackground}&messagecolor=${messageColor}&fontsize=${fontSize}`;

  io.emit('redirect', link)
}

// Directory verifier/creator
let dir = './data';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

// Badges Images
function getChannelBadges() {
  request('GET',
    `https://api.twitch.tv/kraken/users?login=${config.channel}`, {
      headers: {
        'Client-ID': config["Client-ID"],
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

                startChat(channelBadges, globalBadges, bttvEmotes);
                io.emit('configured');
              });
          });
      });
  });
};

function startChat(channel, global, bttv) {
  channelBadges = channel;
  globalBadges = global;
  bttvObject = bttv;
  bttvCodes = [];
  
  for(let i=0; i<bttvObject.length; i++){
    bttvCodes.push(bttvObject[i].code);
  };

  const client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [config.channel]
  });

  client.connect();
  console.log('Chat started!');

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
    
    messageWords = message.split(' ');
    messageWords.some(item => {
      if(bttvCodes.includes(item)){
        let index = bttvCodes.indexOf(item);
        let bttvId = bttvObject[index].id;
        let imageSrc = `<img src="https://cdn.betterttv.net/emote/${bttvId}/1x" alt="${item}">`;
        messageWords[messageWords.indexOf(item)] = imageSrc;
      };
    });
    
    message = messageWords.join(' ');

    messageObject = {
      badges: badgesSource,
      username: tags['username'],
      message: message
    };

    io.emit('message', messageObject);
  });
};
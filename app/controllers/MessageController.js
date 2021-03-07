module.exports = {
  messageTreatment(message, tags, bttvCodes, bttvObject, ffzCodes, ffzObject) {
    messageWords = message.split(' ');

    if (tags['emotes-raw']) {
      let emotes = tags['emotes-raw'].split('/');

      let links = [];

      for (let i = 0; i < Object.keys(emotes).length; i++) {
        emotes[i] = emotes[i].split(':');

        emotes[i][1] = emotes[i][1].split(',');

        for (let j = 0; j < Object.keys(emotes[i][1]).length; j++) {
          emotes[i][1][j] = emotes[i][1][j].split('-');

          let codigo = message.substring(
            parseInt(emotes[i][1][j][0]), parseInt(emotes[i][1][j][1]) + 1
          );

          links.push([codigo, `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${emotes[i][0]}/1.0">`]);
        };
      };

      messageWords.some(item => {
        for (let i = 0; i < Object.keys(links).length; i++) {
          if (links[i][0].includes(item)) {
            let imageSrc = links[i][1];

            messageWords[messageWords.indexOf(item)] = imageSrc;
          }
        }
      });
    };

    messageWords.some(item => {
      if (bttvCodes.includes(item)) {
        let index = bttvCodes.indexOf(item);

        let bttvId = bttvObject[index].id;

        let imageSrc = `<img src="https://cdn.betterttv.net/emote/${bttvId}/1x" alt="${item}">`;

        messageWords[messageWords.indexOf(item)] = imageSrc;
      };
    });

    messageWords.some(item => {
      if (ffzCodes.includes(item)) {
        let index = ffzCodes.indexOf(item);

        let ffzId = ffzObject[index].id;

        let imageSrc = `<img src="https://cdn.frankerfacez.com/emote/${ffzId}/1" alt="${item}">`;

        messageWords[messageWords.indexOf(item)] = imageSrc;
      };
    });

    return message = messageWords.join(' ');
  },
};
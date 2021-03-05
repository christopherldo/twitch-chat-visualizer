const socket = io();

let removerTimer = false;

socket.on("message", function (messageObject) {
  let badges = messageObject.badges;
  let username = messageObject.username;
  let message = messageObject.message;

  document.getElementById("chat").insertAdjacentHTML("beforeend",
    ` <div class="message user-${username}" id="message">
        <div class="badge-and-name" id="badge-and-name">
          ${createBadges(badges)}
          ${username}
        </div>
        <div class="message-content">
          <p>${message}</p>
        </div>
      </div>`
  );

  let maxDivs = 100;

  if (document.querySelectorAll("#message").length > maxDivs) {
    divRemover();
  };
});

function createBadges(badges) {
  if (badges) {
    let badgeImg = ''
    for (var index = 0; index < Object.keys(badges).length; ++index) {
      badgeImg +=
        `<div 
          class="img"
          style="
          background: url(${badges[index]});
          background-size: 100%;"
          ></div>`
    };
    return badgeImg;
  } else {
    return '';
  };
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const nameBackground = urlParams.get('namebackground')
const nameColor = urlParams.get('namecolor')
const messageBackground = urlParams.get('messagebackground')
const messageColor = urlParams.get('messagecolor')
const fontSize = urlParams.get('fontsize')

const styleElement = document.createElement('style');
styleElement.innerHTML = `
  .message .badge-and-name{
    background-color: #${nameBackground};
    color: #${nameColor};
  }
  .message .message-content{
    background-color: #${messageBackground};
    color: #${messageColor};
  }
  body{
    font-size: ${fontSize}px;
  }
`;
document.body.appendChild(styleElement)[0];

function setUsername() {
  let username = channel;

  socket.emit('username', username);
  document.querySelector('.loader').style.display = 'flex';
};

function divRemover() {
  let divMessage = document.getElementById('message');
  if (divMessage) {
    divMessage.remove();
  };
};

function divRemoverByUser(username) {
  let messages = document.querySelectorAll(`.user-${username}`);

  for (let message of messages) {
    if (message) {
      message.remove();
    };
  };
};

socket.on("configured", function () {
  document.querySelector('.loader-container').style.display = 'none';
});

socket.on('ban', function (username) {
  divRemoverByUser(username);
});

socket.on('timeout', function (username) {
  divRemoverByUser(username);
});

socket.on('messagedeleted', function (username) {
  divRemoverByUser(username);
});

socket.on('clearchat', function () {
  document.getElementById("chat").innerHTML = null;
});
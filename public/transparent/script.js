const socket = io();

socket.on("message", function(messageObject) {
  let badges = messageObject.badges;
  let username = messageObject.username;
  let message = messageObject.message;

  document.getElementById("chat").insertAdjacentHTML("beforeend",
    ` <div class="message" id="message">
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

  if(document.querySelectorAll("#message").length > maxDivs){
    document.getElementById('message').remove();
  };
});

function createBadges(badges){
  if(badges){
    let badgeImg = ''
    for(var index = 0; index < Object.keys(badges).length; ++index){
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
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

function openMenu(){
  let menu = document.getElementById('menu');

  if(menu.style.display == ''){
    menu.style.display = 'flex';
  } else if(menu.style.display == 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  };

  const chatBackground = document.getElementById('chat-background');

  chatBackground.addEventListener("input", function(){
    let backgroundColor = chatBackground.value;
    document.body.style.backgroundColor = backgroundColor;  
  }, false);
  
  const nameBackgroundStyle = document.createElement('style');
  const nameBackground = document.getElementById('name-background');

  nameBackground.addEventListener("input", function(){
    let backgroundColor = nameBackground.value;
    nameBackgroundStyle.innerHTML = `.message .badge-and-name{background-color: ${backgroundColor};}`;
    document.body.appendChild(nameBackgroundStyle)[0];
  });

  const nameColorStyle = document.createElement('style');
  const nameColor = document.getElementById('name-color');

  nameColor.addEventListener("input", function(){
    let color = nameColor.value;
    nameColorStyle.innerHTML = `.message .badge-and-name{color: ${color};}`;
    document.body.appendChild(nameColorStyle)[0];
  });

  
  const messageBackgroundStyle = document.createElement('style');
  const messageBackground = document.getElementById('message-background');
  
  messageBackground.addEventListener("input", function(){
    let backgroundColor = messageBackground.value;
    messageBackgroundStyle.innerHTML = `.message .message-content{background-color: ${backgroundColor};}`;
    document.body.appendChild(messageBackgroundStyle)[0];
  });

  const messageColorStyle = document.createElement('style');
  const messageColor = document.getElementById('message-color');
  
  messageColor.addEventListener("input", function(){
    let color = messageColor.value;
    messageColorStyle.innerHTML = `.message .message-content{color: ${color};}`;
    document.body.appendChild(messageColorStyle)[0];
  });

  const chatFontSize = document.getElementById('font-size');

  chatFontSize.addEventListener("input", function(){
    let fontSize = chatFontSize.value;
    let minFontSize = 8;
    let maxFontSize = 20;

    if(fontSize < minFontSize){
      fontSize = minFontSize;
    } else if(fontSize > maxFontSize){
      fontSize = maxFontSize;
    };

    document.body.style.fontSize = fontSize + 'px';
  }, false);
};

function closeMenu(){
  document.getElementById('menu').style.display = 'none';
};
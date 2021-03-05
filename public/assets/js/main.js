const setUsername = () => {
  let usernameForm = document.querySelector('form');
  let usernameInput = document.querySelector('.set-user #usuario');
  let username = usernameInput.value;

  if (username) {
    usernameForm.submit();
  };
};

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  setUsername();
});
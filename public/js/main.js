const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')

// get username and room from url query string
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// emit a user joining chatroom
socket.emit('joinRoom', { username, room})


// message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight; //scroll to bottom
  
});

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get msg from input box
  const msg = e.target.elements.msg.value;

  // emits message to server
  socket.emit('chatMessage', msg);

  e.target.elements.msg.value = ''; // clear input
  e.target.elements.msg.focus();
});

// display message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<div>
  <p class="meta">${message.username} <span>${message.time}</span></p>
   ${message.text}
   </div>`;
  document.querySelector('.chat-messages').appendChild(div);
}

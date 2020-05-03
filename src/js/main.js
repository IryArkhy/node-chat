const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get UserName and Room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io();

//Join chatroom
socket.emit('joinRoom', {
    username, room
})

//Output MSG to DOM
const otputMessage = (info) => {
    const { userName, textMessage, time } = info;
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${userName}<span>  ${time}</span></p>
    <p class="text">${textMessage}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
//Message from server
socket.on('message', info => {
    console.log('info: ', info);
    //Message into DOM
    otputMessage(info);
    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

//Message submit
const handleSubmit = (event) => {
    event.preventDefault();

    //Get msg text
    const msg = event.target.elements.msg.value;
    //Emmiting a message to the server
    socket.emit('chatMsg', msg);

    //Clear the message input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
}
chatForm.addEventListener('submit', handleSubmit)
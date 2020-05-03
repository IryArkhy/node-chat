const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
//Get UserName and Room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io();

//Join chatroom
socket.emit('joinRoom', {
    username, room
});
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
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

//Add room name to DOM
const outputRoomName = (room) => {
    roomName.innerText = room;
}
//Add usersto DOM
const outputUsers = (users) => {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join("")}`
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
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');



const socket = io();

//Output MSG to DOM
const otputMessage = (msg) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">${msg}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
//Message from server
socket.on('message', message => {
    console.log('message: ', message);
    //Message
    otputMessage(message);
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
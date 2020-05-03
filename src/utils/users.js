const users = [];

//Join User to Chat
const joinUser = (user) => {
    users.push(user);
    return user;
};

//User leaves chat
const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

//Get room users
const getRoomUsers = (room) => {
    return users.filter(user => room === user.room);
};


//Get current user
const getCurrentUser = (id) => users.find(user => id === user.id);

module.exports = {
    joinUser,
    getCurrentUser,
    userLeave,
    getRoomUsers
}
const users = [];

//Join User to Chat
const joinUser = (user) => users.push(user);

//Get current user
const getCurrentUser = (id) => users.find(user => id === user.id);

module.exports = {
    joinUser,
    getCurrentUser
}
const user = [];

//Add user to contacts group page
function userJoins(id, username) {
    const user = {id, username};

    userJoins.push(user);

    return user;
}

//Get current user
function getCurrentUser(id) { 
    return userJoins.find(user => user.id === id)
}

module.exports = {
    userJoins,
    getCurrentUser
};
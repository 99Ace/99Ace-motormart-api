const validateUser=(username)=>{
    let userPattern = /^[a-zA-Z0-9]{6,15}$/;
    // [a-zA-Z0-9] - can contain only lowercase, uppercase and numbers only 
    // {6,15}$ - min 6 chars - max 15 chars
    return userPattern.test(username)
}

module.exports = {
    validateUser
}
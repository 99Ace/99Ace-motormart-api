// Set up crypto to hash password
const crypto = require('crypto');

const validatePassword =(password)=>{
    var passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    // (?=.*\d) - contain numbers
    // (?=.*[!@#$%^&*]) - contains special char
    // (?=.*[a-z]) - contains lowercase
    // (?=.*[A-Z]) - contains uppercase
    return passwordPattern.test(password);
}
const hashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

// we are exporting the connect function
module.exports = {
    hashedPassword, validatePassword
}
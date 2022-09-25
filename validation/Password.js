// Set up crypto to hash password
const crypto = require('crypto');

const validatePassword =(password)=>{
    
}
const hashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

// we are exporting the connect function
module.exports = {
    hashedPassword
}
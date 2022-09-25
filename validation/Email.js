const validateEmail=(email)=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // [a-zA-Z0-9._-] - can contain only lowercase, uppercase, numbers, "_", ".", "-" only 
    // +@[a-zA-Z0-9.-] - check for @xxxxx where xxxx can be lowercase, uppercase, numbers
    // \.[a-zA-Z]{2,4}$ - check for .xxxx where xxxx is lowercase, uppercase and (min 2chars - max 4 chars)
    return emailPattern.test(email)
}

module.exports = {
    validateEmail
}
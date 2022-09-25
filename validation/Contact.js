// validate contact : all numbers, length = 8 
validateContact = (elementValue) => {
    let contact = /^[0-9]{8}$/;
    return contact.test(elementValue);
}

module.exports = {
    validateContact
}
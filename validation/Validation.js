const Password = require("./Password");
const User = require("./User");
const Email = require("./Email");
const Contact = require("./Contact");

const validateRegForm = (form) => {
  let validation = [];

  // Validate User Entry
  let validateUser = User.validateUser(form.username);
  console.log("User", validateUser);

  // Validate Password Entry
  let validatePAss = Password.validatePassword(form.password);
  console.log("Password", validatePAss);

  // Validate Email Entry
  let validateEmail = Email.validateEmail(form.email);
  console.log("Email", validateEmail);

  // Validate Contact Entry
  let validateContact = Contact.validateContact(form.contact);
  console.log("Contact", validateContact);

  validation.push(validateUser, validatePAss, validateEmail, validateContact);
  console.log(validation);
};

module.exports = {
  validateRegForm,
};

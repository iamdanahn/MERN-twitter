
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // checks if string with validText on data object
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  // checks email format of arg
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // checks if arg is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  //isValid shows true if errors length is 0 aka no errors
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
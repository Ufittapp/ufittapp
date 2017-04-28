import validate from 'validate.js'
import _ from 'underscore'

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

//If there are no errors nothing is returned.
export const validateFullName = (fullName) => validate.single(fullName, createPresenceAndLengthConstraint(6, 15), options)

export const validateEmail = userEmail => validate.single(userEmail, emailContraints)

export const validatePhoneNumber = phone => validate.single(phone, phoneNumberConstraints)

export const validateBirthdate = birthdate => validate.single(birthdate, dateOnlyConstraints)

export const validateUserName = username => validate.single(username, createPresenceAndLengthConstraint(5, 10))

export const validatePassword = password => validate.single(password, passwordConstraints)

//export const isValidConfirmPassword = (password, confirmPassword) => validate({password, confirmPassword}, passwordAgainConstraints)


const emailContraints = {
  presence: true, 
  email: true
}
const passwordPattern =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
const passwordConstraints = {
  format: {
    pattern: passwordPattern,
    flags: 'i',
    message: 'Password must have at least a number and a special character, and between 6-12 in length'
  }
}

const dateOnlyConstraints = {
  presence: true
}

function createPresenceAndLengthConstraint(minLen, maxLen){
  return {
    presence: true,
    length: {
      minimum: minLen,
      tooShort: 'must be at least %{count} characters',
      maximum: maxLen,
      tooLong: '%{count} characters maximum'
    }
  }
}

const phoneNumberConstraints = {
  presence: true,
  numericality: true
}

const options =  { fullMessages: false, format: 'flat' }




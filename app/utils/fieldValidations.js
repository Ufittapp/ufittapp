import validate from 'validate.js'
import _ from 'underscore'

const emailContraints = {
    from: {
        email: true
    }
}

const passwordPattern =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: 'i'
    }
  }
}

const passwordAgainConstraints = {
  confirmPassword: {
    equality: 'password'
  }
}

//If there are no errors nothing is returned.
export const required = (firstName) => _.isUndefined(validate.single(firstName, { presence: true })) 

export const isValidEmail = userEmail => _.isUndefined(validate({from: userEmail}, emailContraints))

export const isValidPassword = password => _.isUndefined(validate({password}, passwordConstraints))

export const isValidConfirmPassword = (password, confirmPassword) => _.isUndefined(validate({password, confirmPassword}, passwordAgainConstraints))
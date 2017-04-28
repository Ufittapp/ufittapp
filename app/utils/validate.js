import * as fieldValidations from './fieldValidations'
import _ from 'underscore'

export default  validateSignupFormFields = values => {
    const errors = {}
    let { fullName, email, phoneNumber, birthdate, username, password } = values

    errors.fullName = fullNameValidationResult(fullName)
    errors.email = emailValidationResult(email)
    errors.phoneNumber = phoneNumberValidationResult(phoneNumber)
    errors.birthdate = birthdateValidationResult(birthdate)
    errors.username = usernameValidationResult(username)
    errors.password = passwordValidationResult(password)

    return errors
}

const fullNameValidationResult = fullName => createValidationResult(fieldValidations.validateFullName(fullName))
const emailValidationResult = email => createValidationResult(fieldValidations.validateEmail(email))
const phoneNumberValidationResult = phoneNumber => createValidationResult(fieldValidations.validatePhoneNumber(phoneNumber))
const birthdateValidationResult = date => createValidationResult(fieldValidations.validateBirthdate(date))
const usernameValidationResult = date => createValidationResult(fieldValidations.validateUserName(date))
const passwordValidationResult = pass => createValidationResult(fieldValidations.validatePassword(pass))

const createValidationResult = result => _.isUndefined(result) ? undefined : result.join('\n')
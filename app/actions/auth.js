import * as types from './actionTypes'
import AuthManager from '../lib/authenticationManager'

function loginSuccess() { return { type: types.LOGIN_SUCCESS } }
function signupRequest() { return { type: types.SIGNUP_REQUEST } }
function signupSuccess() { return { type: types.SIGNUP_SUCCESS } }
function signupFailure(error) { return { type: types.SIGNUP_FAILURE, payload: error } }

export function createAccount(user){
  return dispatch => {
    //dispatch(signupRequest())
    return AuthManager.createUserAccount(user)
      .then( user => dispatch(signupSuccess()))
      .catch(e => {
        //dispatch(signupFailure('Cannot create account due to an error', e))
        return Promise.reject(e)
      })
  }
}

export function login(email, password){
  return dispatch => {
    return AuthManager.login(email, password)
      .then( (user) => dispatch(loginSuccess()) )
      .catch(e => Promise.reject(e) )
  }
}
import * as types from './actionTypes'
import AuthManager from '../lib/authenticationManager'

function signupRequest() { return { type: types.SIGNUP_REQUEST } }
function signupSuccess() { return { type: types.SIGNUP_SUCCESS } }
function signupFailure(error) { return { type: types.SIGNUP_FAILURE, payload: error } }

export function createAccount(user){
  return dispatch => {
    //dispatch(signupRequest())
    return AuthManager.createUserAccount(user)
      .then( user => dispatch(signupSuccess(user)))
      .catch(e => {
        //dispatch(signupFailure('Cannot create account due to an error', e))
        return Promise.reject(e)
      })
  }
}
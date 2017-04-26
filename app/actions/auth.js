import * as types from './types'
import authManager from '../lib/authenticationManager'

function signupRequest() { return { type: types.SIGNUP_REQUEST } }
function signupSuccess(json) { return { type: types.SIGNUP_SUCCESS, payload: json } }
function signupFailure(error) { return { type: types.SIGNUP_FAILURE, payload: error } }

export function createAccount(user){
  return dispatch => {
    dispatch(signupRequest())
    return authManager.createAccount(user)
      .then( user => dispatch(signupSuccess(user)))
      .catch(e => {
        dispatch(signupFailure(e))
        return Promise.reject(e)
      })
  }
}
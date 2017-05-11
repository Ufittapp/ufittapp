import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function globalReducer(state = initialState.global, action){
    if(action.SIGNUP_SUCCESS){
        return Object.assign({}, state, { firstTimeUser: true})
    }

    if(action.LOGIN_SUCCESS){
        return Object.assign({}, state, { firstTimeUser: false})
    }

    return state
}
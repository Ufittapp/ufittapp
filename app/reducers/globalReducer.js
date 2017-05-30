import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function globalReducer(state = initialState.global, action){
    switch(action.type){
        case types.SIGNUP_SUCCESS:
        console.log('SIGNUP_SUCCESS on global reducer')
           //const { fullName, email, phone, userId } = action.payload
           return Object.assign({}, state, { isFetching: false }) 
        case types.SIGNUP_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload })
        default: return state
    }
}
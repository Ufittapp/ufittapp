import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function usersReducer(state = initialState.users, action){
    switch(action.type){
        case types.USER_LIST_SUCCESS:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}
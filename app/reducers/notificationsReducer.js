import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function notificationsReducer(state = initialState.notifications, action){
    switch(action.type){
        case types.NOTIFICATIONS_LIST_SUCCESS:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}
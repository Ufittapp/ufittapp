import api from '../lib/api'
import * as types from './actionTypes'

function onUserListSuccess(payload){
    return {
        type: types.USER_LIST_SUCCESS,
        payload
    }
}

function getUsers(){
    return dispatch => {
        return api.getUsers()
            .then(users => {
                dispatch(onUserListSuccess(users))
            })
            .catch(e => console.log('error', e))
    }
}

function followUser(userId){
    return dispatch => {
        return api.followUser(userId)
    }
}


module.exports = { getUsers, followUser }
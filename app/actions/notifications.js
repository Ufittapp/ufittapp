import api from '../lib/api'
import * as types from './actionTypes'

function onNotificationsListSuccess(payload){
    return {
        type: types.NOTIFICATIONS_LIST_SUCCESS,
        payload
    }
}

function getNotifications(){
    return dispatch => {
        return api.getNotifications()
            .then(data => {
                dispatch(onNotificationsListSuccess(data))
            })
            .catch(e => console.log('error getting notifications', e))
    }
}

module.exports = { getNotifications }
import createReducer from './createReducer'
import * as types from '../actions/types'

export const signup = createReducer({
    isFetching: false,
    fullName: '',
    email: '',
    phone: '',
    birthday: '',
    username: '',
    error: null
}, 
{
    [types.SIGNUP_REQUEST](state, action){
        return Object.assign({}, state, {isFetching: true})
    },

    [types.SIGNUP_SUCCESS](state, action){b             
        const { fullName, email, phone, userId } = action.payload

        return Object.assign({}, state, { isFetching: false })
    },

    [types.SIGNUP_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            error: action.payload
        })
    }
})
import createReducer from './createReducer'
import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function signupReducer(state = initialState.signup, action){
    return state  // right now just simple return current state

    /*
    switch(action.type){
        case types.SIGNUP_REQUEST:
            return Object.assign({}, state, { isFetching: true })
        case types.SIGNUP_SUCCESS:
           //const { fullName, email, phone, userId } = action.payload
           return Object.assign({}, state, { isFetching: false }) 
        case types.SIGNUP_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload })
        default: return state
    }*/
}

const signup = createReducer({
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
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
//import signup from './signupReducer'

const rootReducer = combineReducers({ 
    form: formReducer
})

export default rootReducer
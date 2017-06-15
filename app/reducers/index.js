import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import navReducer from './navReducer' 
import globalReducer from './globalReducer'
import users from './usersReducer'
//import signup from './signupReducer'

const rootReducer = combineReducers({ 
    form: formReducer,
    nav: navReducer,
    global: globalReducer,
    users
})

export default rootReducer
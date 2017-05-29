import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import navReducer from './navReducer' 
import globalReducer from './globalReducer'
//import signup from './signupReducer'

const rootReducer = combineReducers({ 
    form: formReducer,
    nav: navReducer,
    global: globalReducer
})

export default rootReducer
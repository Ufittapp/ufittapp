import { combineReducers } from 'redux-immutablejs'
import { reducer as formReducer } from 'redux-form/immutable'
const form = formReducer

const rootReducer = combineReducers({ form })

export default rootReducer
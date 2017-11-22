import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'

// eslint-disable-next-line
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__});

export default function configureStore(initialState){
	const enhancer = compose(
        applyMiddleware(thunkMiddleware) //loggerMiddleware
    )

	return createStore(rootReducer, initialState, enhancer)
}
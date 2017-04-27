import React from 'react'
import SignupScreen from './app/containers/SignupScreen'
import { Provider } from 'react-redux'
//import { fromJS } from 'immutable'
import configureStore from './app/store/configureStore'
import firebase from 'firebase'
import { firebaseConfigs } from './app/config/secrets'

firebase.initializeApp(firebaseConfigs)

const store = configureStore()

export default class App extends React.Component{
    
    render(){
        return (
            <Provider store={store}>
                <SignupScreen />
            </Provider>
        );
    }
}
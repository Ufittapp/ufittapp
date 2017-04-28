import React from 'react'
import * as screens from './app/navigation/ApplicationScreens'
import { Provider } from 'react-redux'
//import { fromJS } from 'immutable'
import configureStore from './app/store/configureStore'
import firebase from 'firebase'
import { firebaseConfigs } from './app/config/secrets'
import { StackNavigator } from 'react-navigation';

firebase.initializeApp(firebaseConfigs)

const store = configureStore()

export default class Root extends React.Component{
    
    render(){
        return (
            <Provider store={store}>
                <SignupScreen />
            </Provider>
        );
    }
}
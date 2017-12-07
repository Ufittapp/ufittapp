import React from 'react'
import { Provider } from 'react-redux'
//import { fromJS } from 'immutable'
import configureStore from './app/store/configureStore'
import firebase from 'firebase'
import AppNavigator from './app/navigator/appNavigator'
import FCM, { FCMEvent} from 'react-native-fcm';

const store = configureStore()

export default class Root extends React.Component{
   


    
    render(){
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}
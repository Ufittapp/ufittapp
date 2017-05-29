import React from 'react'
import { Provider } from 'react-redux'
//import { fromJS } from 'immutable'
import configureStore from './app/store/configureStore'
import firebase from 'firebase'
import { firebaseConfigs } from './app/config/secrets'
import AppNavigator from './app/navigator/appNavigator'

import FCM from 'react-native-fcm';


firebase.initializeApp(firebaseConfigs)

const store = configureStore()

export default class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log("user is logged in")

                const firstTimeUser = store.getState().global.firstTimeUser

                console.log("firstTimeUser", firstTimeUser)

                FCM.requestPermissions()
                FCM.getFCMToken().then(token => {
                    console.log("FCM token", token)

                    //const id = token.split(':')[0]

                    firebase.database()
                        .ref('tokens')
                        .child(user.uid)
                        .set({token})
                        .then(() => console.log('token saved to database'))
                        .catch(e => console.log('token not saved to database. Error: ', e))

                })

                //FCM.subscribeToTopic('welcome-message');

                this.notificationListener = FCM.on('notification',  notif => {
                    console.log('notification opened', notif);
                    
                })

                this.refreshTokenListener = FCM.on('refreshToken', (token) => {
                    console.log("on refresh token", token)
                    // fcm token may not be available on first load, catch it here
                })

            }else{
                console.log("use is logged out")
            }
        })
    }

    componentWillUnmount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                // stop listening for events
                //this.notificationListener.remove();
                //this.refreshTokenListener.remove();
            }
        })
    }
    
    render(){
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}
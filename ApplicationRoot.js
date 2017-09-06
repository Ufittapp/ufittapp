import React from 'react'
import { Provider } from 'react-redux'
//import { fromJS } from 'immutable'
import configureStore from './app/store/configureStore'
import firebase from 'firebase'
import AppNavigator from './app/navigator/appNavigator'
import FCM, { FCMEvent} from 'react-native-fcm';

const store = configureStore()

export default class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                //console.log("user is logged in")

                const firstTimeUser = store.getState().global.firstTimeUser

                //console.log("firstTimeUser", firstTimeUser)

                FCM.requestPermissions()
                FCM.getFCMToken().then(token => {
                    //console.log("FCM token", token)


                    firebase.database()
                        .ref('tokens')
                        .child(user.uid)
                        .once('value')
                        .then((snap) => {
                            if(!snap.exists()){
                                firebase.database()
                                    .ref('tokens')
                                    .child(user.uid)
                                    .set({token})
                                    .then(() => console.log('token saved to database'))
                                    .catch(e => console.log('token not saved to database. Error: ', e))
                            }else{
                                //console.log('user already have the token stored in the db')
                            }
                        })

                })


                this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
                    console.log('notification opened', notif);
                    
                })

                this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token)  => {
                    console.log("on refresh token", token)
                    // fcm token may not be available on first load, catch it here
                })

            }else{
                console.log("use is logged out")
            }
        })
        
    }

    componentWillUnmount() {
       // firebase.auth().onAuthStateChanged(user => {
         //   if(user){
                // stop listening for events
                //this.notificationListener.remove();
                //this.refreshTokenListener.remove();
           // }
       // })
    }
    
    render(){
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Button,
  TouchableHighlight,
  Navigator,
  Platform
} from 'react-native'; 
import { Container } from 'native-base';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import styles from '@assets/styles/landing'
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import firebase from 'firebase'
import db from '../config/database'



class LandingScreen extends React.Component{

    getData(fullName, profileMedia, email, id){
        db.usersRef.child(id).set({
            birthdate: 'null',
            createdAt: Date.now(),
            email: email,
            fullName: fullName,
            phoneNumber: 'null',
            userId: id,
            username: fullName,
            profileMedia: profileMedia
        })
    }
    
    _fbAuth(){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'})
        ]
      })

      var that = this;

      LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result){
        if(result.isCancelled){
          console.log('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
            firebase.auth().signInWithCredential(credential).then((result) => {
                console.log("Credential", result);
                that.getData(result.displayName, result.photoURL, result.email, result.uid);

                 that.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))

            }, (error) => {
              console.log(error);
            })


          }, (error => {
            console.log('Some error occured: ' + error);
          }))

        }
      }, function(error){
        console.log('An error occured:' + error);
      })
    }
    render(){
        return (
          <Image source={require('@assets/images/splash_bg.png')} style={styles.backgroundImage}>
            <Container style={styles.welcomenew} >
              <Image source={require('@assets/images/logo.png')} style={styles.logo} />
              <View style={styles.buttonsContainer}>
                  <TouchableHighlight 
                    onPress={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'Signup' }))
                    }} 
                    style={styles.registerButton}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableHighlight>

                  <TouchableHighlight 
                    onPress={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
                    }} 
                    style={styles.loginButton}>
                    <Text style={styles.buttonText}>Log In</Text>
                  </TouchableHighlight>
              </View>

                <View>
                  <TouchableHighlight  style={styles.fbButton} onPress={() => this._fbAuth()}>
                    <Text style={styles.buttonText}>Log on with Facebook</Text>
                  </TouchableHighlight>
                </View>
           

              <View>

              </View>


                   
            </Container>
           </Image>

        )
    }
}



LandingScreen.propTypes = {
    navigation: React.PropTypes.object.isRequired
}

LandingScreen.navigationOptions = {
  header: null
}

export default connect()(LandingScreen)
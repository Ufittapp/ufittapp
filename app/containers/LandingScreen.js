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
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import styles from '@assets/styles/landing'
import FBLoginView  from '../components/FBLoginView.js'


class LandingScreen extends React.Component{
    loginFacebook(){
      console.log('clicked!!');
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
                      <FBLogin
            buttonView={<FBLoginView />}
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={["email","user_friends"]}
            onLogin={function(e){console.log(e)}}
            onLoginFound={function(e){console.log(e)}}
            onLoginNotFound={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
          />
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
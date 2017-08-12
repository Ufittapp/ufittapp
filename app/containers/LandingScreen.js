import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Button,
  TouchableHighlight,
  Navigator
} from 'react-native'; 
import { Container } from 'native-base';

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import styles from '@assets/styles/landing'

class LandingScreen extends React.Component{
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
                <TouchableHighlight  style={styles.fbButton}>
                  <Text style={styles.buttonText}>Join with Facebook</Text>
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
import React from 'react'
import { Label } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import styles from '@assets/styles/landing'
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

class SplashScreen extends React.Component{
    constructor(props){
        super(props)

        this.redirectUser = this.redirectUser.bind(this)
    }

    componentDidMount(){
        setTimeout(this.redirectUser, 2000)
    }

    redirectUser(){
        var user = firebase.auth().currentUser;
        
        if(user){
            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
        }else{
            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Landing' }))
        }

        //firebase.auth().signOut()
    }

    render(){
        return(
            <Image source={require('@assets/images/splash_bg.png')} style={styles.backgroundImage}>

            <View style={styles.welcome}>
              <Image source={require('@assets/images/logo.png')} style={styles.logo} />
              
            </View>
           </Image>

        )
    }
}

SplashScreen.navigationOptions = {
    header: null
}

export default SplashScreen
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  Button,
  TouchableHighlight,
  Navigator
} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,

  },

  welcome: {
    top: deviceHeight - 300,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    height: 170,
    justifyContent: "center",
    resizeMode: "contain",
    width: deviceWidth - 40,


  },

  buttonsContainer: {
    flexDirection: 'row',

  },

  registerButton: {
    width: 150,
    backgroundColor: '#55160d',
    marginRight: 10,
    paddingTop:12,
    paddingBottom: 12,
    borderRadius: 5
  },

  loginButton:  {
    width: 150,
    backgroundColor: '#a15d1d',
    marginLeft: 10,
    paddingTop:12,
    paddingBottom: 12,
    borderRadius: 5
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15
  },
  fbButton: {
    borderRadius: 5,
    backgroundColor: '#242e4d',
    paddingTop:12,
    paddingBottom: 12,
    width: 320,
    marginTop: 10
  }
});

class BackgroundImage extends React.Component{
  render() {
      return (
        <Image source={require('@assets/images/splash_bg.png')} style={styles.backgroundImage}>

            {this.props.children}

        </Image>
      )
  }
}

export default class App extends React.Component{
    render(){
        return (


          <Image source={require('@assets/images/splash_bg.png')} style={styles.backgroundImage}>

            <View style={styles.welcome}>
              <Image source={require('@assets/images/logo.png')} style={styles.logo} />
              <View style={styles.buttonsContainer}>
                  <TouchableHighlight onPress={onButtonPress} style={styles.registerButton}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableHighlight>

                  <TouchableHighlight onPress={onButtonPress} style={styles.loginButton}>
                    <Text style={styles.buttonText}>Log In</Text>
                  </TouchableHighlight>
              </View>

                <View>
                <TouchableHighlight onPress={onButtonPress} style={styles.fbButton}>
                  <Text style={styles.buttonText}>Join with Facebook</Text>
                </TouchableHighlight>
                </View>

              <View>

              </View>
            </View>
           </Image>

        );
    }
}
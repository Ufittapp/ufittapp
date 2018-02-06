import React, { Component } from 'react'
import { Container, Content,  ListItem, Left, Icon, Right, Body, Button } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import FooterTabs from '../common/FooterTabs'
import firebase from 'firebase'
import {  Image, View, Text, Dimensions } from 'react-native'
import styles from '@assets/styles/landing'
const height = Dimensions.get('window').height / 2 - 120



class SettingsScreen extends Component{
  static navigationOptions = {
        tabBarLabel: 'Settings'
  }

  render(){
     const { navigate } = this.props.navigation;

    return(
   
       <Image source={require('@assets/images/splash_bg.png')} style={styles.backgroundImage}>

      <Container style={{ justifyContent: 'center', alignItems: 'center', marginTop: height }}>
        <Content >
         

            <View style={styles.logoContainer}>
                            <Image
                                style={styles.userBg}
                                source={{uri: 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png'}} />

                    </View>
             <View style={styles.buttonsContainer2}>
                 <Button full 
                 onPress={() => {

                      firebase.auth().signOut()
                      this.props.goToLogin()
                    }}
                 style={{ backgroundColor: '#7a1405'}}>
                        <Text style={styles.white}>LOG OUT</Text>
                      </Button>
                
              </View>
        </Content>
      </Container>
    </Image>
    )
  }
}

SettingsScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='settings' style={{ color: '#ffffff', opacity: 1}} />
    ),
}

function mapDispatchToProps(dispatch){
  return{
    goToSettings: () => dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
    goToLogin: () => dispatch(NavigationActions.navigate({ routeName: 'Landing' })),
  }
}

export default connect(null, mapDispatchToProps)(SettingsScreen)
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation'
import { BackAndroid } from 'react-native';
import * as screens from './applicationScreens'

const MainNavigator = TabNavigator({
  Main: { screen: screens.HomeScreen },
  Users: { screen: screens.UserListScreen },
  Notif: { screen: screens.NotificationsScreen },
  UserProfile: { screen: screens.UserProfileScreen },
  Settings: { screen: screens.SettingsScreen }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions:{
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#7a1405',
    },
    indicatorStyle: {
      backgroundColor: '#fff'
    }
  }
})

export const AppNavigator = StackNavigator({
  Login: { screen: screens.LoginScreen },
  Signup: { screen: screens.SignupScreen },
  Home: { screen: MainNavigator },
  Settings: { screen: screens.SettingsScreen },
  Landing: { screen: screens.LandingScreen },
  Splash: { screen: screens.SplashScreen },
  ChatRoom: { screen: screens.ChatRoomScreen },
  PublicProfile: {screen: screens.PublicProfileScreen},
  Comments: {screen: screens.CommentScreen}

});

class AppWithNavigationState extends React.Component{
  constructor(props){
    super(props)

    this.addBackButtonListener = this.addBackButtonListener.bind(this)
  }
  
  shouldCloseApp(nav) {
      return nav.index == 0;
  }

  addBackButtonListener(){
    BackAndroid.addEventListener('backPress', () => {
      const {dispatch, nav} = this.props

      if (this.shouldCloseApp(nav)) return false
      
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }
  
  componentDidMount() {
    this.addBackButtonListener()

    //this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName, params })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPress')
  }

  render(){
    const { dispatch, nav } = this.props

    return <AppNavigator
              ref={nav => { this.navigator = nav; }}
              navigation={addNavigationHelpers({ dispatch, state: nav })} 
            />
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ nav: state.nav });

export default connect(mapStateToProps)(AppWithNavigationState);
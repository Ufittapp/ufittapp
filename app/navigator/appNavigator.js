import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { BackAndroid } from 'react-native';
import * as screens from './applicationScreens'

export const AppNavigator = StackNavigator({
  Login: { screen: screens.LoginScreen },
  Signup: { screen: screens.SignupScreen },
  Home: { screen: screens.HomeScreen }
});

class AppWithNavigationState extends React.Component{
  shouldCloseApp(nav) {
      return nav.index == 0;
  }
  
  componentDidMount() {
    BackAndroid.addEventListener('backPress', () => {
      const {dispatch, nav} = this.props
      
      if (this.shouldCloseApp(nav)) return false
      
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPress')
  }

  render(){
    const { dispatch, nav } = this.props

    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ nav: state.nav });

export default connect(mapStateToProps)(AppWithNavigationState);
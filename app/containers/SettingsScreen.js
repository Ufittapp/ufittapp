import React, { Component } from 'react'
import { Container, Content, Footer, Text, 
    Separator, ListItem, Left, Right, Body, Icon, Button
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import FooterTabs from '../common/FooterTabs'
import firebase from 'firebase'

class SettingsScreen extends Component{
  static navigationOptions = {
        tabBarLabel: 'Settings'
  }

  render(){
     const { navigate } = this.props.navigation;

    return(
      <Container>
        <Content>
          <ListItem icon>
            <Left>
                <Icon name="log-out" />
            </Left>
            <Body>
                
                <Button primary
                    onPress={() => {

                      firebase.auth().signOut()
                      this.props.goToLogin()
                    }}>
                    <Text>Log out</Text>
                </Button>
            </Body>
            <Right />
        </ListItem>

        </Content>
      </Container>
    )
  }
}

SettingsScreen.navigationOptions = {
    header: null,
}

function mapDispatchToProps(dispatch){
  return{
    goToSettings: () => dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
    goToLogin: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
  }
}

export default connect(null, mapDispatchToProps)(SettingsScreen)
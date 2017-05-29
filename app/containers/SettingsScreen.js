import React, { Component } from 'react'
import { Container, Content, Footer, Text, 
    Separator, ListItem, Left, Right, Body, Icon
} from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import FooterTabs from '../common/FooterTabs'

class SettingsScreen extends Component{
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
                <Text>Logout</Text>
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
    goToSettings: () => dispatch(NavigationActions.navigate({ routeName: 'Settings' }))
  }
}

export default connect(null, mapDispatchToProps)(SettingsScreen)
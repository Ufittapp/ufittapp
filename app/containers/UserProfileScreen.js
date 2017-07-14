import React from 'react'
import { Text, Icon } from 'native-base'

class UserProfileScreen extends React.Component{
    render(){
        return (
            <Text>Profile screen</Text>
        )
    }
}

UserProfileScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='person' />
    ),
}

export default UserProfileScreen
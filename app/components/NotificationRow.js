import React from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';


export default class NotificationRow extends React.Component{
    render(){
        return(
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png' }} />
              </Left>
              <Body>
                <Text>{this.props.data.sender.username}</Text>
                <Text note>{`${this.props.data.sender.username} ${this.props.data.text}`}</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
        )
    }
}
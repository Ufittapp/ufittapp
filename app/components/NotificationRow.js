import React from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';


export default class NotificationRow extends React.Component{
    render(){
        return(
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://unsplash.it/200/300/?random' }} />
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
import React from 'react'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import { TouchableWithoutFeedback, Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import styles from '@assets/styles/profile'
import db, { firebaseAuth } from '../config/database'
import { NavigationActions } from 'react-navigation'



class ChatList extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'ChatList'
  }

  constructor(props){
        super(props)
        this.state = {
            users: [],
        }
    }

   

  componentWillMount(){
    var that = this;
    db.usersRef.on('value', function(snapshot){
        var users = [];
        snapshot.forEach(function(childSnapshot){

            var user = {
              fullName: childSnapshot.val().fullName,
              email:    childSnapshot.val().email,
              userId:   childSnapshot.val().userId,
              username: childSnapshot.val().username,
              profileMedia: childSnapshot.val().profileMedia || 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png'
            }
            users.push(user);
        })

        that.setState({
          users: users
        })
    })
  }
   
  userList(){
    const {navigate} = this.props.navigation;


     return this.state.users.map((data, index) => {
        return (
          <ListItem avatar key={index} style={{paddingTop: 10, paddingBottom: 10}} onPress={() => navigate('ChatRoomNew', {userId: data.userId, username: data.username})}>
              <Left>
                <Thumbnail source={{ uri: data.profileMedia }} />
              </Left>
              <Body>
                <Text>{data.username}</Text>
              </Body>
              
            </ListItem>
            )
      })
  }

   

    render(){
      console.log(this.state.users);

        return (
    <Container>
        <Content>
          <List>
            {this.userList()}
          </List>
        </Content>
      </Container>
          )
           
    }
}

ChatList.navigationOptions = {
    header: null,
    //tabBarLabel: 'Users'
    tabBarIcon: ({ tintColor }) => (
      <Icon name='contacts' style={{ color: '#ffffff', opacity: 1}} />
    ),
}




export default connect()(ChatList)
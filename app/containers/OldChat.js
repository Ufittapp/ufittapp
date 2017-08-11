import React from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, View,  ScrollView } from 'react-native'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, Header, Left, Body, Title, Right, Footer, List, ListItem, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'
import db, { firebaseAuth } from '../config/database'
import styles from '@assets/styles/profile'



class ChatRoom extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'ChatRoomNew'
  }

  constructor(props){
        super(props)

             this.state = {
            comments: [],
            comments2: [],
            message: "",
            senderName: "",
            senderID: "",
            currentUserId: ""
        }
        }
    

    getActualUsername(id){
        var username;
        db.usersRef.orderByChild('userId').equalTo(id).once('child_added', function(snapshot){
            username = snapshot.val().username;
        })

        return username;

    }


  componentWillMount(){
        const {state} = this.props.navigation;
        const senderName = state.params.username;
        const senderID = state.params.userId;
        const currentUser = firebase.auth().currentUser.uid;
        var that = this;


        this.setState({
            senderName: senderName,
            senderID: senderID,
            currentUserId: currentUser
        })

          db.chatsRef.child(currentUser).child('messages').child(senderID).child('room').on("value", function(snapshot){

              var comments = [];
            snapshot.forEach(function(childsnap){
                 var comment = {
                    senderName: childsnap.val().senderName,
                    message:  childsnap.val().message
                 }

                 comments.push(comment);

            }.bind(this));

                that.setState({
                    comments: comments
                });

             }.bind(this))



          db.chatsRef.child(senderID).child('messages').child(currentUser).child('room').on("value", function(snapshot){

              var comments2 = [];
            snapshot.forEach(function(childsnap){
                 var comment = {
                    senderName: childsnap.val().senderName,
                    message:  childsnap.val().message
                 }

                 comments2.push(comment);

            }.bind(this));

                that.setState({
                    comments: this.state.comments.concat(comments2)
                });

             }.bind(this))

   }


     sendNewMessage(usernameId, message, id){
          if (message != "") {
                db.chatsRef.child(usernameId).child('messages').child(id).child('room').push({
                 message: message,
                 senderName: this.getActualUsername(id)
                })    
          }
  }

   ListMessages(){
    return this.state.comments.map((data, index) => {
        return (
              <ListItem avatar key={index}>
             
              <Body>
                <Text>{data.senderName}</Text>
                <Text note>{data.message}</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
           

            )
    })
  }

  
      

    render(){
        console.log(this.state.comments);
        const {goBack} = this.props.navigation;
        return (
            <Container >
                <Header style={styles.headerBg}>
                  <Left>
                    <Button transparent onPress={() => goBack()}>
                      <Icon name='md-arrow-round-back' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>{this.state.senderName}</Title>
                  </Body>
                  <Right />
                </Header>
                <Content>
                    <List>
                      {this.ListMessages()}
                    </List>
                    </Content>
                    <View style={styles.sendBox}>
                        <Item>
                            <Input  name="message-text" placeholder='Write a message' onChangeText={(message) => this.setState({message})} />
                            <Icon name='md-send' onPress={() => this.sendNewMessage(this.state.senderID, this.state.message, this.state.currentUserId)} />
                        </Item>
                    </View>

            </Container>
        )
    }
}

ChatRoom.navigationOptions = {
    header: null,
}




export default connect()(ChatRoom)
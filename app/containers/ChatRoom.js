  import React, {
  Component,
} from 'react';
import {
  Linking,
  Platform,
  ActionSheetIOS, 
  Dimensions,
  View,
  Text,
  Navigator,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux'
import Backend from '../components/Backend'
import firebase from 'firebase'
import db, { firebaseAuth } from '../config/database'
import styles from '@assets/styles/profile'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon   } from 'native-base';


class ChatRoom extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'ChatRoomNew'
  }
  state = {
    messages: [],
    senderName: "",
    senderID: "",
    currentUserId: "",
    uniqueRoomKey: ""
  };


  getCurrentUser = () => firebase.auth().currentUser


  uid = '';
  messagesRef = null;

  // initialize Firebase Backend

  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = db.chatsRef.child(this.state.uniqueRoomKey);
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }

 hash() {
    var h=0, i=0;

    if(arguments.length == 1) {
        for(i=0; i < arguments[0].length; i++) {
            h = (h * 31 + arguments[0].charCodeAt(i)) & 0xffffffff;
        }
    }
    else {
        for(i in arguments) {
            h ^= this.hash(arguments[i]);
        }
    }

    return h;
}
  componentWillMount() {
      const {state} = this.props.navigation;
        const senderName = state.params.username;
        const senderID = state.params.userId;
        const currentUser = firebase.auth().currentUser.uid;
        var that = this;
      const uniqueRoomKey = this.hash(this.getCurrentUser().uid, senderID);



        this.setState({
            senderName: senderName,
            senderID: senderID,
            currentUserId: currentUser,
            uniqueRoomKey: uniqueRoomKey
        })


  }

  getActualUsername(id){
        var username;
        db.usersRef.orderByChild('userId').equalTo(id).once('child_added', function(snapshot){
            username = snapshot.val().username;
        })

        return username;

    }

   

  render() {
     const {goBack} = this.props.navigation;

  return (
     <Container>
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
           <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
          this.sendMessage(message);
        }}
        user={{
          _id: this.state.currentUserId,
          name: this.getActualUsername(this.state.currentUserId),
        }}
      /> 
        
      </Container>
      
    );
  }



 componentDidMount() {
    this.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    this.closeChat();
  }
}



ChatRoom.navigationOptions = {
    header: null,
} 




export default connect()(ChatRoom)
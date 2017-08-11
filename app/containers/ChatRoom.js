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





class ChatRoom extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'ChatRoomNew'
  }
  state = {
    messages: [],
    senderName: "",
    senderID: "",
    currentUserId: ""
  };
  componentWillMount() {
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
  }

  getActualUsername(id){
        var username;
        db.usersRef.orderByChild('userId').equalTo(id).once('child_added', function(snapshot){
            username = snapshot.val().username;
        })

        return username;

    }

  render() {
    console.log(this.state.messages);
  return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: this.state.currentUserId,
          name: this.getActualUsername(this.state.currentUserId),
        }}
      />
    );
  }



 componentDidMount() {
    Backend.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}



ChatRoom.navigationOptions = {
    header: null,
} 




export default connect()(ChatRoom)
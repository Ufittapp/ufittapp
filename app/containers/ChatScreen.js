import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase'

export default class Example extends React.Component {
    static navigationOptions ={
        title: 'Public Chat Room'
    }

    getCurrentUser = () => firebase.auth().currentUser

    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.onSend = this.onSend.bind(this);
    }

  componentWillMount() {
      firebase.database().ref('chatsMessages').on('value', snapShot => {
          if(snapShot.exists()){
              
              let messages = []

              snapShot.forEach(message => {
                  messages.push({
                      _id: message.key,
                      text: message.val().text,
                      createdAt: new Date(message.val().createdAt),
                      user: {
                          _id: message.val().createdBy.userId,
                          name: message.val().createdBy.name,
                          avatar: 'https://facebook.github.io/react/img/logo_og.png'
                      }
                })
            })
            
            this.setState({ messages })
          }
      })
  }

  saveMessage(newMessage){
      if(!newMessage)
        return

      const newMessageRef = firebase.database().ref('chatsMessages').push()
      newMessageRef.setWithPriority({
          text: newMessage.text,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          createdBy: {
              userId: newMessage.user._id,
              email: newMessage.user.name
          }}, 0 - Date.now())
          .then(() => console.log('new message saved to db', newMessage))
  }

  onSend(messages = []) {
      this.saveMessage(messages[0])
  }

  render() {
    return (
     <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.getCurrentUser().uid,
          name: this.getCurrentUser().email
        }}
      />
    );
  }
}
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase'

export default class Example extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: `Chat with ${navigation.state.params.user.name}`
    })

    getCurrentUser = () => firebase.auth().currentUser

    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.onSend = this.onSend.bind(this)
    }

  componentDidMount() {
      const params = this.props.navigation.state.params
      const uniqueRoomKey = this.hash(this.getCurrentUser().uid, params.user.uid)

      firebase.database()
        .ref('chatMessages')
        .child(uniqueRoomKey)
        .child('messages')
        .on('value', snapShot => {

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
                          avatar: `https://unsplash.it/200/300?image=${Math.floor((Math.random() * 20) + 1)}`
                      }
                })
            })
            
            this.setState({ messages })
          }
      })
  }

  componentWillUnmount(){
      console.log('chat screen unmounted')
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

  saveMessage(newMessage){
      if(!newMessage)
        return

     const params = this.props.navigation.state.params
     const uniqueRoomKey = this.hash(this.getCurrentUser().uid, params.user.uid)
     const messagesRef = firebase.database().ref('chatMessages')
     const chatRoomMetadataRef= firebase.database().ref('chatRoomMetadata')
        
     messagesRef
        .child(uniqueRoomKey)
        .once('value')
        .then(snap => {
            if(!snap.exists()){
                messagesRef
                    .child(uniqueRoomKey)
                    .set({ user1: this.getCurrentUser().email, user2: params.user.email})
                    .then( () => this.insertMessage(uniqueRoomKey, newMessage))
                    .then( () => console.log('complete tree created'))
                    .catch(e => console.lo('Error creating complete tree', e))
            }else{
                this.insertMessage(uniqueRoomKey, newMessage)
                    .then(() => console.log('new message inserted only'))
                    .catch(e => console.log('error inserting new message only', e))
            }
        })     
  }

  insertMessage(key, newMessage){
      const newMessageRef = firebase
                                .database()
                                .ref('chatMessages')
                                .child(key)
                                .child('messages')
                                .push()

      return newMessageRef
        .setWithPriority(
            {
                text: newMessage.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                createdBy: {
                    userId: newMessage.user._id,
                    email: newMessage.user.name
                }
            }
            , 0 - Date.now())
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
          name: this.getCurrentUser().email,
          avatar: 'https://unsplash.it/100/100?image=0'
        }}
      />
    );
  }
}
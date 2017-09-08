import React from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, View,  ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Icon, Container, Content, Form, Label, Item, Input, Toast, Button, Header, Left, Body, Title, Right, Footer, List, ListItem, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'
import db, { firebaseAuth } from '../config/database'
import AutoScroll from 'react-native-auto-scroll'
import CommentList from '../components/CommentList'





class CommentScreen extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'Comments'
  }

  constructor(props){
        super(props)
          
             this.state = {
            comments: [],
            message: "",
            videoId: "",
            currentUserId: "",
            key: ""
        }
        }
   

   handleSend = () => {
    const { text } = this.state
    const { uid, photoURL, displayName } = firebaseAuth.currentUser
    const commentsRef = this.getUserCommentsRef()
    var newCommentRef = commentsRef.push()
    newCommentRef.set({ 
      text,
      userPhoto: photoURL,
      uid: uid,
      name: displayName
     });
    this.setState({ text: '' })
  }

  getUserCommentsRef = () => {
       return db.videosRef.child('-KspR9aDt8_J-BQbXHLG').child('comments');
      }

   handleChangeText = (text) => this.setState({text})

    componentDidMount() {
    const {state} = this.props.navigation;
    const videoId = state.params.video;
    const currentUser = firebase.auth().currentUser.uid;
    this.setState({
        videoId: videoId,
        currentUserId: currentUser
    })

    this.getUserCommentsRef().on('child_added', this.addComment)
  }
  
  addComment = (data) => {
    const comment = data.val()
    this.setState({
      comments: this.state.comments.concat(comment)
    })
  }

   componentWillUnmount() {
    console.warn("Unmounting");
     this.getUserCommentsRef().off('child_added', this.addComment)
  }


    render(){
        const {goBack} = this.props.navigation;
        const { comments } = this.state

        return (
            <Container >
                <Header style={{backgroundColor: '#212121'}}>
                  <Left>
                    <Button transparent onPress={() => goBack()}>
                      <Icon name='md-arrow-round-back' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Comments</Title>
                  </Body>
                  <Right />
                </Header>
                        
              <View style={styles.container}>
                  <CommentList comments={comments} />
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={this.state.text}
                      placeholder="Write a comment"
                      onChangeText={this.handleChangeText}
                    />
                    <TouchableOpacity onPress={this.handleSend}>
                      <Icon name="ios-send-outline" size={30} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>



            </Container>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },

  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 50,
    flex: 1
  },
  
});

CommentScreen.navigationOptions = {
    header: null,
}




export default connect()(CommentScreen)
import React from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, View,  ScrollView } from 'react-native'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, Header, Left, Body, Title, Right, Footer, List, ListItem, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'
import db, { firebaseAuth } from '../config/database'
import styles from '@assets/styles/profile'
import AutoScroll from 'react-native-auto-scroll'




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

    getKey(id){
        var key;
        db.videosRef.orderByChild('videoID').equalTo(id).once('child_added', function(snap){
            key = snap.key;
         })     
        return key;
    }

    getPicture(id){
       var image;
        db.videosRef.orderByChild('videoID').equalTo(id).once('child_added', function(snap){
            image = snap.val().profileMedia || 'http://via.placeholder.com/350x150' ;
         })     
        return image;
    }
  


 


  componentWillMount(){
        const {state} = this.props.navigation;
        const videoId = state.params.video;
        const currentUser = firebase.auth().currentUser.uid;
        var that = this;

        this.setState({
          videoId: videoId,
          currentUserId: currentUser
        })



            var key = this.getKey(videoId);
             db.videosRef.child(key).child('comments').on("value", function(snapshot){

                 var comments = [];
            snapshot.forEach(function(childsnap){
                 var comment = {
                    username: childsnap.val().usuario,
                    message:  childsnap.val().message
                 }

                 comments.push(comment);

            }.bind(this));

                that.setState({
                    comments: comments
                });

             }.bind(this))
  }


  createNewComment(username, message, id){


          if (message != "") {
                var key = this.getKey(id);
                db.videosRef.child(key).child('comments').push({
                 message: message,
                 usuario: username
                })    
          }
  }

  ListComment(){
    return this.state.comments.map((data, index) => {
        return (
              <ListItem avatar key={index}>
              <Left>
                <Thumbnail source={{ uri: 'http://via.placeholder.com/350x150' }} />
              </Left>
              <Body>
                <Text>{data.username}</Text>
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
                    <Title>Comments</Title>
                  </Body>
                  <Right />
                </Header>
                  <ScrollView ref="scrollView"
             onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})} >        

                    <List>
                        {this.ListComment()}
                    </List>
                    </ScrollView>
                    <View style={styles.sendBox}>
                        <Item>
                            <Input id="comment-text" name="comment-text" placeholder='Write a comment' onChangeText={(message) => this.setState({message})} />
                            <Icon name='md-send' onPress={() => {  
                      this.createNewComment(this.getActualUsername(this.state.currentUserId), this.state.message, this.state.videoId)
                    }} />
                        </Item>
                    </View>

            </Container>
        )
    }
}

CommentScreen.navigationOptions = {
    header: null,
}




export default connect()(CommentScreen)
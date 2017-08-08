import React from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, View,  ScrollView } from 'react-native'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, Header, Left, Body, Title, Right, Footer, List, ListItem, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'
import db, { firebaseAuth } from '../config/database'
import styles from '@assets/styles/profile'



class CommentScreen extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'Comments'
  }

  constructor(props){
        super(props)

             this.state = {
            comments: [],
            username: [],
            message: "",
        }
        }
    


  componentDidMount(){
        const {state} = this.props.navigation;
          console.log(state);
          const videoId = state.params.video;
        const currentUser = firebase.auth().currentUser.uid;
        console.log(currentUser);

        var that = this;

         db.usersRef.orderByChild('userId').equalTo(currentUser).on('child_added', function(snapshot){
            var user = {
                    
                    username: snapshot.val().username
                }

            that.setState({
                username: user
            })

        })

        db.videosRef.orderByChild('videoID').equalTo(videoId).on('child_added', function(snap){
            var key = snap.key;
            console.log(key);
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
       

        })
        
  }

  createNewComment(username, message){
          const {state} = this.props.navigation;
          console.log(state);
          const videoId = state.params.video;
         // const username = state.params.usuario;

          console.log(videoId);
          console.log(this.state.message);


          if (message != "") {
             db.videosRef.orderByChild('videoID').equalTo(videoId).on('child_added', function(snapshot){
                    var key = snapshot.key;
                    console.log(key);
                db.videosRef.child(key).child('comments').push({
                 message: message,
                 usuario: username
                })    
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
                <Content>
                    <List>
                        {this.ListComment()}
                    </List>
                    </Content>
                    <View style={styles.sendBox}>
                        <Item>
                            <Input id="comment-text" name="comment-text" placeholder='Write a comment' onChangeText={(message) => this.setState({message})} />
                            <Icon name='md-send' onPress={() => {  
                      this.createNewComment(this.state.username.username, this.state.message)
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
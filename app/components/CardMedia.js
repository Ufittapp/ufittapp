
import React, { Component } from 'react';
import {
  StyleSheet,
  View, Image, TouchableWithoutFeedback, Share
} from 'react-native';
import styles from '@assets/styles/home'
import { NavigationActions, StackNavigator } from 'react-navigation';
import firebase from 'firebase'
import VideoPlayer from 'react-native-video-controls';
import { firebaseAuth } from '../config/database'
import { ListItem, Spinner,  Button, Icon, Thumbnail, Drawer, Container, Content, Card, CardItem,  Text,   Left, Body, Right, Header, Title} from 'native-base'



export default class CardMedia extends Component {

  static navigationOptions = {
        tabBarLabel: 'CardMedia'
  }

  constructor(props){
        super(props)
            this.state = {
            profileMedia: ""
        }

        this.loadProfilePicture =this.loadProfilePicture.bind(this);
  }

   createLike(videoID, userId){
     var that = this;
        db.videosRef.orderByChild('videoID').equalTo(videoID).on('child_added', function(snapshot){
              var newLikeKey = snapshot.key;
              var username = snapshot.val().username;
              const currentUserId = firebase.auth().currentUser.uid;
              const currentUser = firebase.auth().currentUser;

            db.videosRef.child(newLikeKey).child('likes_count').child(currentUserId).once("value", function(snap){ 
                  if (snap.exists() !== true) {

                    console.log('You have not liked this', snapshot.val() );
                    db.videosRef.child(newLikeKey).child('likes_count').child(currentUserId).set({
                       userID: currentUserId,
                      videoID: videoID,
                      color: 'red'
                    })
                    that.sendNotification(userId, currentUser);
                  }else{
                     db.videosRef.child(newLikeKey).child('likes_count').child(currentUserId).remove();
                  }
             });
        }.bind(this))
    }


    sendNotification(userId, currentUser){
      console.log(userId);
      console.log(currentUser);
        const newNotification = {
          type: 'NEW_LIKE',
          text: 'has liked your post',
          sender: {
              userId: currentUser.uid,
              username: currentUser.email.split('@')[0]
          }
      }
        db.notificationsRef
          .child(userId)
          .push(newNotification);
    }
    

    returnTime(previousTime){
      timeNeeded = Date.now() - previousTime;
      inMinutes = (timeNeeded/1000) / 60;
      if (inMinutes < 20) {
        return parseInt(inMinutes) + " minutes ago";
      } else if (inMinutes < 40) {
        return "about 30 minutes ago";
      } else if (inMinutes < 80) {
        return "about an hour ago";
      } else if (inMinutes > 1380 && inMinutes < 2760) {
        return "a day ago";
      } else if (inMinutes < 1380) {
        hours = parseInt(inMinutes/60);
        return "about " + hours + " hours ago";
      } else {
        var date = new Date(previousTime);
        return date.toDateString();
      }

    }

    getKey(id){
        var key;
        db.videosRef.orderByChild('videoID').equalTo(id).on('child_added', function(snapshot){
            key = snapshot.key;
        })
        return key;
    }

     buttonColor(videoid){
          const currentUserId = firebase.auth().currentUser.uid;
          var videokey = this.getKey(videoid);
          var color = null;
    

          db.videosRef.child(videokey).child('likes_count').orderByChild('userID').equalTo(currentUserId).on('value', function(snapchild){
            if (snapchild.exists() == true) {
               color = '#7a1405';            
            }else{
              color = 'gray';
            } 
          })

          return color;

    }

    loadProfilePicture = () => {
    const { userId } = this.props.task;
     var that = this;
        db.usersRef.orderByChild('userId').equalTo(userId).once('child_added').then(function(snapshot){
          that.setState({ 
            profileMedia: snapshot.val().profileMedia || "https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png"
          })

        }, function(error){
            console.error(error);
        })

     
    }

    componentDidMount(){
      this.loadProfilePicture();
    }


     _shareTextWithTitle (mediaUrl) {
    Share.share({
      message: mediaUrl,
      title: 'Ufitt Share',
      url: mediaUrl
    }, {
      dialogTitle: 'This is share dialog title',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter',
        'com.apple.uikit.activity.mail'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch(err => console.log(err))
  }


      displayMedia(url){

        if (url.includes("/videos/")) {
            return <VideoPlayer
                  
                    source={{uri: url}}
                    style={styles.videoBg}
                    navigator={ this.props.navigator }

                  />

        } else{
          return <Image source={{uri: url }} style={{height: 200, width: null, flex: 1}}/>



        }

    }

  render() {
    const { likes_count, shares, thumbnailUrl, time, comments, userId, username, videoId, profileMedia, description, challenge } = this.props.task;
    
    Object.size = function(obj) {
          var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
             }
            return size;
        };
        var that = this;
        console.log("Props", this.props);
       const { navigate } = this.props.task.navigation;

    return (
       <Card>
            <CardItem>
              <Left>
                <TouchableWithoutFeedback onPress={() =>  
                      navigate('PublicProfile', {usuario: userId})}>
                <Thumbnail  source={{ uri: this.state.profileMedia }} />
                </TouchableWithoutFeedback>
              
                <Body>
                    <TouchableWithoutFeedback onPress={() => 
                      navigate('PublicProfile', {usuario: userId}) 

                    }>

                  <Text>{username}</Text>
                  </TouchableWithoutFeedback>
                  <Text note style={styles.status}>posted</Text>
                </Body>
              </Left>
              <Right>
               <Button transparent>

                    <Icon name='clock' style={styles.clockText} />
                    <Text style={styles.status}>{this.returnTime(time)}</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{description}</Text>
              </Body>
              <Right>
                <Text>Challenge? {challenge}</Text>
              </Right>
              </CardItem>
            <CardItem cardBody>

              {this.displayMedia(thumbnailUrl)}
            </CardItem>
            <CardItem>
              <Left>

                 <Button transparent onPress={() => {  
                      this.createLike(videoId, userId)
                    }}>
                  <Icon  name="thumbs-up" style={{color: this.buttonColor(videoId)}} />
                  <Text style={styles.status}> {Object.size(likes_count)} Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent onPress={() =>  navigate('Comments', {video: videoId, usuario: username, userId: userId})}>
                  <Icon  name="chatbubbles" style={styles.clockText} />
                  <Text style={styles.status}> {Object.size(comments)} Comments</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent onPress={() => {  
                      this._shareTextWithTitle(thumbnailUrl)
                    }}>

                    <Icon  name="md-share" style={styles.clockText} />
                    <Text style={styles.status}>Share</Text>
                </Button>
              </Right>
            </CardItem>


          </Card>
    );
  }
}

CardMedia.navigationOptions = {
    header: null,
}



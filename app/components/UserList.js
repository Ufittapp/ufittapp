import React from 'react'
import { ListItem,  Button, Icon, Thumbnail,  Container, Content, Card, CardItem,  Text,   Left, Body, Right} from 'native-base'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import styles from '@assets/styles/home'
import db, { firebaseAuth } from '../config/database'
import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'




class UserRow extends React.Component{




    constructor(props){
        super(props)

        this.state = {
            isFollowing: false,
            usersArray: []
        }
    }

    componentDidMount(){
        this.props.amIFollowingUser(this.props.item.userId).then( isFollowing => this.setState({isFollowing}))
        .catch(e => console.log('error getting following status for user', e))


    }

    componentWillMount(){
     var that = this;

       db.videosRef.orderByChild('userId').equalTo(this.props.item.userId).on('child_added', function(snapshot){
            var user = {
                likes:  snapshot.val().likes_count,
                shares: snapshot.val().shares_count,
                thumbnailUrl: snapshot.val().thumbnail,
                time: snapshot.val().uploaded_date,
                comments: snapshot.val().comments_count
            }

            that.setState({
            usersArray: user
        });

        }.bind(this));
    }


    createLike(videoID){



        db.videosRef.orderByChild('userId').equalTo(videoID).on('child_added', function(snapshot){
              var newLikeKey = snapshot.key;
              var username = snapshot.val().username;
              const currentUserId = firebase.auth().currentUser.uid

              if (snapshot.val().likes_count != null) {
                  db.videosRef.child(newLikeKey).child('likes_count').orderByChild('userID').equalTo(currentUserId).on('child_added', function(childSnaphot){

                      var removeKey = childSnaphot.key;
                      console.log(removeKey);
                      db.videosRef.child(newLikeKey).child('likes_count').child(removeKey).remove();
                  }.bind(this))

                  console.log('Dislike');
              }else{
                db.videosRef.child(newLikeKey).child('likes_count').push({
                  userID: currentUserId
                })

                console.log('Like');
              }


              

        }.bind(this))
    }
  
      
    likesCount(id){
          Object.size = function(obj) {
          var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
             }
            return size;
        };


        var likes = this.state.usersArray.likes;

        if (likes != null) {
            var size = Object.size(likes);
        }else{
          var size = 0;
        }

        return (

               <Button transparent onPress={() => {  
                      this.createLike(id)
                    }}>
                  <Icon  name="thumbs-up" style={styles.clockText} />
                  <Text style={styles.status}> {size} Likes</Text>
                </Button>

          )
    }

    videoList(){

        return (

              

                 <Card>
            <CardItem>
              <Left>
                <TouchableWithoutFeedback onPress={() => {  
                      this.props.goToProfile(this.props.item.userId)
                    }}>
                <Thumbnail source={require('@assets/images/feed_img.png')} />
                </TouchableWithoutFeedback>
                <Body>
                    <TouchableWithoutFeedback onPress={() => {  
                      this.props.goToProfile(this.props.item.userId)
                    }}>

                  <Text>{this.props.item.fullName}</Text>
                  </TouchableWithoutFeedback>
                  <Text note style={styles.status} onPress={() => {
                            if(!this.state.isFollowing){
                                this.props.followUser(this.props.item)
                                this.setState({isFollowing: true})
                            }else{
                                this.props.unFollowUser(this.props.item.userId)
                                this.setState({isFollowing: false})
                            }


                            }}>{this.state.isFollowing ? 'Unfollow' : ' Follow'} </Text>
                </Body>
              </Left>
              <Right>
               <Button transparent>

                    <Icon name='clock' style={styles.clockText} />
                    <Text style={styles.status}>{this.state.usersArray.time}h</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.state.usersArray.thumbnailUrl }} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                {this.likesCount(this.props.item.userId)}
              </Left>
              <Body>
                <Button transparent>
                  <Icon  name="chatbubbles" style={styles.clockText} />
                  <Text style={styles.status}>{this.state.usersArray.comments} Comments</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent>

                    <Icon  name="md-share" style={styles.clockText} />
                    <Text style={styles.status}>{this.state.usersArray.shares}</Text>
                </Button>
              </Right>
            </CardItem>


          </Card>

            )
    }

    render(){
        console.log(this.state.users.likes);
        return(

             
            <View>
                {this.videoList()}

            </View>
       
        )
    }
}

UserRow.propTypes = {
    amIFollowingUser: React.PropTypes.func.isRequired,
    goToProfile: React.PropTypes.func.isRequired,
}



export default UserRow

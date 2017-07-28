import React from 'react'
import { ListItem,  Button, Icon, Thumbnail,  Container, Content, Card, CardItem,  Text,   Left, Body, Right, Header, Title} from 'native-base'
import { connect } from 'react-redux'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import { followUser, amIFollowingUser, unFollowUser } from '../actions'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import UserList from '../components/UserList'
import styles from '@assets/styles/home'
import db, { firebaseAuth } from '../config/database'


class HomeScreen extends React.Component{
      constructor(props){
        super(props)

        
        this.goToProfile = this.goToProfile.bind(this),
        this.followUser = this.followUser.bind(this),
        this.unFollowUser = this.unFollowUser.bind(this),
        this.state = {
            isFollowing: false,
            users: []
        }
    }

   

    componentDidMount(){


        var that = this;
        db.videosRef.on('value', function(snap){
            var users = [];
            snap.forEach(function(snapshot){
               
                var user = {
                    likes_count:  snapshot.val().likes_count,
                    shares: snapshot.val().shares_count,
                    thumbnailUrl: snapshot.val().thumbnail,
                    time: snapshot.val().uploaded_date,
                    comments: snapshot.val().comments_count,
                    userId: snapshot.val().userId,
                    username: snapshot.val().username,
                }

                users.push(user);
            }.bind(this));

                that.setState({
                    users: users
                });

        }.bind(this))

    }
    

    followUser(user){
        this.props.followUser(user.userId)
        .then(() => console.log('user followed'))
        .catch( e => console.log('error following', e))
    }

    unFollowUser(userId){
        this.props.unFollowUser(userId)
        .then(() => console.log('user UNfollowed'))
        .catch( e => console.log('error UNfollowing', e))
    }

    goToProfile(userId){
        this.props.goToProfile(userId)
        .then(() => console.log('Clicked'))
        .catch( e => console.log('error UNfollowing', e))
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
  
    
   


    userList(){

        Object.size = function(obj) {
          var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
             }
            return size;
        };
  


        return this.state.users.map((data, index) =>{
      
            return (
                
                 <Card key={index}>
            <CardItem>
              <Left>
                <TouchableWithoutFeedback onPress={() => {  
                      this.props.goToProfile(data.userId)
                    }}>
                <Thumbnail source={require('@assets/images/feed_img.png')} />
                </TouchableWithoutFeedback>
                <Body>
                    <TouchableWithoutFeedback onPress={() => {  
                      this.props.goToProfile(data.userId)
                    }}>

                  <Text>{data.username}</Text>
                  </TouchableWithoutFeedback>
                  <Text note style={styles.status}>posted</Text>
                </Body>
              </Left>
              <Right>
               <Button transparent>

                    <Icon name='clock' style={styles.clockText} />
                    <Text style={styles.status}>{data.time}h</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: data.thumbnailUrl }} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                 <Button transparent onPress={() => {  
                      this.createLike(data.userId)
                    }}>
                  <Icon  name="thumbs-up" style={styles.clockText} />
                  <Text style={styles.status}> {Object.size(data.likes_count)} Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon  name="chatbubbles" style={styles.clockText} />
                  <Text style={styles.status}>{data.comments} Comments</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent>

                    <Icon  name="md-share" style={styles.clockText} />
                    <Text style={styles.status}>{data.shares}</Text>
                </Button>
              </Right>
            </CardItem>


          </Card>
            )
        })
    }

    render(){
             const { navigate } = this.props.navigation;

            //In this Render, we are getting the List of users from components/UserList.js file
        return(
            <Container>
             <Header style={styles.headerBg}>
                     <Left>
                         <Button transparent>
                             <Icon name='menu' style={styles.whiteText} />
                         </Button>
                     </Left>
                     <Body>
                         <Title style={styles.whiteText}>Feed</Title>
                     </Body>
                     <Right>
                         <Button transparent>
                             <Icon name='ios-more-outline' style={styles.whiteText} />
                         </Button>
                     </Right>
                 </Header>
                <Content>
              
                  {this.userList()}

                </Content>
            </Container>
        )
    }
}

HomeScreen.propTypes = {
    navigation: React.PropTypes.object.isRequired,

}

HomeScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='home' style={{ color: '#ffffff', opacity: 1}} />
    ),
}

function mapStateToProps(state){
    const currentUser = firebase.auth().currentUser
     
     if(currentUser){
         delete state.users[currentUser.uid]
     }
 
     return {
         users: state.users
     }
 }

function mapDispatchToProps(dispatch){
    return{

        followUser: (userId) => dispatch(followUser(userId)),
        amIFollowingUser: (userId) => dispatch(amIFollowingUser(userId)),
        unFollowUser: (userId) => dispatch(unFollowUser(userId)),
        goToProfile: (userId) => dispatch(NavigationActions.navigate({ routeName: 'PublicProfile',  params: { usuario: userId } })),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

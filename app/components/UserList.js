import React from 'react'
import { ListItem,  Button, Icon, Thumbnail,  Container, Content, Card, CardItem,  Text,   Left, Body, Right} from 'native-base'
import { View, Image } from 'react-native'
import styles from '@assets/styles/home'
import db from '../config/database'
import firebase from 'firebase'



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

          var that = this;

        db.videosRef.orderByChild('userId').equalTo(this.props.item.userId).on('child_added', function(snapshot){
            var user = {
                likes: snapshot.val().likes_count,
                shares: snapshot.val().shares_count,
                thumbnailUrl: snapshot.val().thumbnail,
                time: snapshot.val().uploaded_date,
                comments: snapshot.val().comments_count
            }

            that.setState({
            usersArray: user
        });

        });

       
       


    }

  

    videoList(){
        return (

              

                 <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('@assets/images/feed_img.png')} />
                <Body>
                  <Text>{this.props.item.fullName}</Text>
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
                <Button transparent>
                  <Icon  name="thumbs-up" style={styles.clockText} />
                  <Text style={styles.status}>{this.state.usersArray.likes} Likes</Text>
                </Button>
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

        return(

             
            <View>
                {this.videoList()}
            </View>
       
        )
    }
}

UserRow.propTypes = {
    amIFollowingUser: React.PropTypes.func.isRequired
}

export default UserRow

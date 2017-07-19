import React from 'react'
import { ListItem,  Button, Icon, Thumbnail} from 'native-base'
import { View, Text, Image } from 'react-native'
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

                <View>
                    <View style={styles.feedContainer}>
                        <View style={styles.feedHeader}>

                            <View style={styles.userFeed}>
 
                              <View><Thumbnail size={40} source={require('@assets/images/feed_img.png')} /></View>
                                <View style={styles.userName}>
                                    <Text style={styles.boldName}>{this.props.item.fullName}</Text>
                                    <Text style={styles.status} onPress={() => {
                            if(!this.state.isFollowing){
                                this.props.followUser(this.props.item)
                                this.setState({isFollowing: true})
                            }else{
                                this.props.unFollowUser(this.props.item.userId)
                                this.setState({isFollowing: false})
                            }


                            }}>{this.state.isFollowing ? 'Unfollow' : ' Follow'} </Text>
                                </View>
 
                            </View>
 
                             <View style={styles.timeFeed}>
                               <Icon name='clock' style={styles.clockText} />
                               <Text style={styles.status}>{this.state.usersArray.time}h</Text>
                             </View>
 
                         </View>
 
                         <View style={styles.feedSlide}>
                           <Image source={{uri: this.state.usersArray.thumbnailUrl }} style={styles.feedImg}/>
                         </View>
                     </View>
 
                     <View style={styles.footerFeed}>
                         <View style={styles.iconContainer}>
                           <Icon name='heart' style={styles.footerFeedIcons} />
                           <Text style={styles.footerFeedText}>{this.state.usersArray.likes}K</Text>
                         </View>
 
                         <View style={styles.iconContainer}>
                           <Icon name='chatboxes' style={styles.footerFeedIcons} />
                           <Text style={styles.footerFeedText}>{this.state.usersArray.comments}</Text>
                         </View>
 
                         <View style={styles.iconContainer}>
                           <Icon name='md-share' style={styles.footerFeedIcons} />
                           <Text style={styles.footerFeedText}>{this.state.usersArray.shares}</Text>
                         </View>
 
                        <View style={styles.iconContainer}>
                          <Icon name='person' style={styles.footerFeedIcons} />
                          <Text style={styles.footerFeedText}>profile</Text>
                         </View>
                     </View>
                </View>

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

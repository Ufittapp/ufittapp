import React from 'react'
import { ListItem, View, Button, Text} from 'native-base'

class UserRow extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isFollowing: false
        }
    }

    componentDidMount(){
        this.props.amIFollowingUser(this.props.item.userId).then( isFollowing => this.setState({isFollowing}))
        .catch(e => console.log('error getting following status for user', e))
    }

    render(){
        return(
            <ListItem>
                <View style={{flexDirection: 'row'}}>
                    <Button dark transparent style={{width: 180}}
                        onPress={() => {
                            //this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'ChatRoom' }))
                            /*this.props.navigation.navigate('ChatRoom', { user: {
                                name: item.fullName,
                                uid: item.userId,
                                email: item.email
                            }})*/
                        }}>
                        <Text>{this.props.item.fullName}</Text>
                    </Button>

                     <Button 
                        light
                        onPress={() => {
                            if(!this.state.isFollowing){
                                this.props.followUser(this.props.item)
                                this.setState({isFollowing: true})
                            }else{
                                this.props.unFollowUser(this.props.item.userId)
                                this.setState({isFollowing: false})
                            }


                            }}>
                         <Text> {this.state.isFollowing ? 'Unfollow' : ' Follow'} </Text>
                     </Button>
                </View>
            </ListItem>
        )
    }
}

UserRow.propTypes = {
    amIFollowingUser: React.PropTypes.func.isRequired
}

export default UserRow

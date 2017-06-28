import React from 'react'
import { Container, Content, List, ListItem, Text, Button, View } from 'native-base'
import { connect } from 'react-redux'
import { getUsers, followUser } from '../actions'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'

class UserListScreen extends React.Component{

    constructor(props){
        super(props)

        this.renderRow = this.renderRow.bind(this)
        //this.sendPN = this.sendPN.bind(this)
        this.followUser = this.followUser.bind(this)
    }

    componentDidMount(){
        this.props.getUsers()
    }

    sendPN(toUser){
        const currentUser = firebase.auth().currentUser
        firebase
            .database()
            .ref('notifications')
            .child(toUser.userId)
            .push({
                text: `${currentUser.email} wants to chat with you!`,
                from: currentUser.email,
                to: toUser.fullName,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            })
            .then(() => console.log('notification saved to db'))
            .catch(e => console.log('error saving notification', e))
    }

    followUser(user){
        this.props.followUser(user.userId)
        .then(() => console.log('user followed'))
        .catch( e => console.log('error following', e))
    }

    renderRow(item){
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
                        <Text>{item.fullName}</Text>
                    </Button>

                     <Button 
                        light
                        onPress={() => this.followUser(item) }>
                         <Text> Follow </Text>
                     </Button>
                </View>
            </ListItem>
        )
    }

    render(){
        return(
            <Container>
                <Content>
                    <List 
                        dataArray={this.props.users}
                        renderRow={this.renderRow}>
                    </List>
                </Content>
            </Container>
        )
    }
}

UserListScreen.navigationOptions = {
    header: null,
    tabBarLabel: 'Users'
}

function mapStateToProps(state){
    const currentUser = firebase.auth().currentUser
    delete state.users[currentUser.uid]

    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch){
    return{
        getUsers: () => dispatch(getUsers()),
        followUser: (userId) => dispatch(followUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen)
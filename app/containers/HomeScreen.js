import React from 'react'
import { Container, Content, List, Text, Button, View, Icon, Header, Left, Body, Title, Right } from 'native-base'
import { connect } from 'react-redux'
import { getUsers, followUser, amIFollowingUser, unFollowUser } from '../actions'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import UserList from '../components/UserList'
import styles from '@assets/styles/home'





class HomeScreen extends React.Component{
      constructor(props){
        super(props)

        this.renderRow = this.renderRow.bind(this)
        //this.sendPN = this.sendPN.bind(this)
        this.followUser = this.followUser.bind(this)
        this.unFollowUser = this.unFollowUser.bind(this)
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

    unFollowUser(userId){
        this.props.unFollowUser(userId)
        .then(() => console.log('user UNfollowed'))
        .catch( e => console.log('error UNfollowing', e))
    }

    renderRow(item){
        return <UserList 
                    followUser={this.followUser} 
                    item={item}
                    amIFollowingUser={this.props.amIFollowingUser}
                    unFollowUser={this.unFollowUser}
                />
    }

    render(){
        return(
            <Container>
             <Header style={styles.headerBg}>
                     <Left />
                     <Body>
                         <Title style={styles.whiteText}>Feed</Title>
                     </Body>
                     <Right>
                         <Button transparent>
                             <Icon name='more' style={styles.whiteText} />
                         </Button>
                     </Right>
                 </Header>
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

HomeScreen.propTypes = {
    navigation: React.PropTypes.object.isRequired
}

HomeScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='home' />
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
        getUsers: () => dispatch(getUsers()),
        followUser: (userId) => dispatch(followUser(userId)),
        amIFollowingUser: (userId) => dispatch(amIFollowingUser(userId)),
        unFollowUser: (userId) => dispatch(unFollowUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

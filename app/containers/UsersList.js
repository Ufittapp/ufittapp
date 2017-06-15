import React from 'react'
import { Container, Content, List, ListItem, Text, Button } from 'native-base'
import { connect } from 'react-redux'
import { getUsers, login } from '../actions'
import { NavigationActions } from 'react-navigation'

class UserListScreen extends React.Component{

    constructor(props){
        super(props)

        this.renderRow = this.renderRow.bind(this)
    }

    componentDidMount(){
        this.props.getUsers()
    }

    renderRow(item){
        return(
            <ListItem>
                <Button dark transparent
                    onPress={() => {
                        //this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'ChatRoom' }))
                        this.props.navigation.navigate('ChatRoom', { user: {
                            name: item.fullName,
                            uid: item.userId,
                            email: item.email
                        }})
                    }}>
                    <Text>{item.fullName}</Text>
                </Button>
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
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch){
    return{
        getUsers: () => dispatch(getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen)
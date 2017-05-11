import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, View, Text} from 'native-base'
import LoginForm from '../components/LoginForm'
import { login } from '../actions'
import { NavigationActions } from 'react-navigation';

class LoginScreen extends Component{
    constructor(props){
        super(props)

        this.state = {
            isFetching: false,
            error: null
        }

        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this)
    }

    onLoginFormSubmit(data){
        console.log("login form submitted")
        const { email, password } = data

        this.setState({isFetching: true})
        this.props.login(email, password).then(() => {
                    this.setState({isFetching: false, error: null})
                    //this.props.resetForm()
                    this.props.goHome()
                })
                .catch(error => this.setState({error, isFetching: false}))
    }

    render(){
        return(
            <Container>
                <Content>
                    <LoginForm onSubmit={this.onLoginFormSubmit} />
                </Content>
            </Container>
        )
    }
}

LoginScreen.PropTypes = {
    goHome: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.object.isRequired
}

LoginScreen.navigationOptions = {
    header: null
}

function mapDispatchToProps(dispatch){
    return {
        login: (email, password) => dispatch(login(email, password)),
        goHome: () => dispatch(NavigationActions.navigate({ routeName: 'Home' })),
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen)
import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
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

        this.props.onLogin(email, password).then(() => {
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
                    <View style={ {paddingLeft: 10, paddingRight: 10} }>
                        {this.state.error && <Text>{this.state.error}</Text>}
                        {this.state.isFetching && <Text>{'signing in...'}</Text>}
                    </View>
                    <LoginForm onSubmit={this.onLoginFormSubmit} />
                    <TouchableWithoutFeedback onPress={this.props.goToSignup}>
                        <Text> Create Account </Text>
                    </TouchableWithoutFeedback>

                </Content>
            </Container>
        )
    }
}

LoginScreen.PropTypes = {
    goHome: React.PropTypes.func.isRequired,
    goToSignup: React.PropTypes.func.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.object.isRequired
}

LoginScreen.navigationOptions = {
    header: null
}

function mapDispatchToProps(dispatch){
    return {
        onLogin: (email, password) => dispatch(login(email, password)),
        goHome: () => dispatch(NavigationActions.navigate({ routeName: 'Home' })),
        goToSignup: () => dispatch(NavigationActions.navigate({ routeName: 'Signup' })),
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen)
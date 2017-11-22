import React, { Component } from 'react'
import { TouchableWithoutFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, View, Header, 
        Left, Right, Body, Title, Text, Button, Icon } from 'native-base'
import LoginForm from '../components/LoginForm'
import { login } from '../actions'
import { NavigationActions } from 'react-navigation';
import styles from '@assets/styles/signup'


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
        const {goBack} = this.props.navigation;

        return(
            <Container>
             <Header style={styles.headerBg}>
                    <Left>
                      <Button transparent onPress={() => goBack()}>
                      <Icon name='md-arrow-round-back' />
                    </Button>
                  </Left>
                    <Body>
                        <Title style={styles.whiteText}>Sign In</Title>
                    </Body>
                    <Right>
                      <Button transparent>
                          <Icon name='ios-more-outline' style={styles.whiteText} />
                      </Button>
                  </Right>
                </Header>
               <Image source={require('@assets/images/register_bg.png')} style={styles.backgroundImage}>        

                <Content>
                    <View style={ {paddingLeft: 10, paddingRight: 10} }>
                        {this.state.error && <Text>{this.state.error}</Text>}
                        {this.state.isFetching && <Text>{'signing in...'}</Text>}
                         <LoginForm onSubmit={this.onLoginFormSubmit} />
                    <TouchableWithoutFeedback onPress={this.props.goToSignup}>
                        <Text style={ {marginTop: 30, color: '#fff', alignSelf: 'center'} }> Create Account </Text>
                    </TouchableWithoutFeedback>
                    </View>
                   

                </Content>
            </Image>
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
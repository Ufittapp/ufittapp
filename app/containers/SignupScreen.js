import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from '../components/SignupForm'
import { Container, Content, View, Header, 
        Left, Right, Body, Title, Text } from 'native-base'
import { Image } from 'react-native'
import { createAccount } from '../actions'
import { NavigationActions } from 'react-navigation';
import { reset } from 'redux-form';
import styles from '@assets/styles/signup'

class SignupScreen extends Component{
	constructor(props){
		super(props)

        this.state = {
            isFetching: false,
            error: null
        }

		this.onFormSubmit = this.onFormSubmit.bind(this)
    }

	onFormSubmit(newUser){
        console.log('Save pressed')
        
        this.setState({isFetching: true})
        this.props.createAccount(newUser)
            .then(
                () => {
                this.setState({isFetching: false, error: null})
                this.props.resetForm()
                this.props.goHome()
            })
            .catch(error => this.setState({error, isFetching: false}))
	}
	
	render(){
		return(
			<Container>
                <Header style={styles.headerBg}>
                    <Left />
                    <Body>
                        <Title style={styles.whiteText}>Create Profile</Title>
                    </Body>
                    <Right />
                </Header>
                
                <Image source={require('@assets/images/register_bg.png')} style={styles.backgroundImage}>        
                     <Content>
                        <View style={ {paddingLeft: 10, paddingRight: 10} }>
                            {this.state.error && <Text>{this.state.error}</Text>}
                            {this.state.isFetching && <Text>{'Creating account...'}</Text>}
                            <SignUpForm
                                onSubmit={this.onFormSubmit} />
                        </View>
                    </Content>   
                </Image>
            </Container>
		) 
	}
}

function mapStateToProps(state, ownProps){
    //console.log("ownProps", ownProps)   
    return { signup: state.signup }
}

function mapDispatchToProps(dispatch){
    return {
        createAccount: newUser => dispatch(createAccount(newUser)),
        goHome: () => dispatch(NavigationActions.navigate({ routeName: 'Home' })),
        resetForm : () => dispatch(reset('signupForm'))
    }
}

SignupScreen.propTypes = {
    //signup: React.PropTypes.object.isRequired,
    createAccount: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.object.isRequired,
    goHome: React.PropTypes.func.isRequired
}

SignupScreen.navigationOptions = {
    header: null
}

export default connect(null, mapDispatchToProps)(SignupScreen)
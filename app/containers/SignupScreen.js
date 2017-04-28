import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from '../components/SignupForm'
import { Container, Content, View, Header, Left, Right, Body, Title, Text} from 'native-base'
import { createAccount } from '../actions'
import { NavigationActions } from 'react-navigation';

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
        this.props.goHome()

		//console.log('Save pressed', newUser)
        
        /*this.setState({isFetching: true})
        this.props.createAccount(newUser)
            .then(() => {
                this.setState({isFetching: false, error: null})        
                console.log('accout created successfully')
            })
            .catch(error => this.setState({error, isFetching: false}))	*/	
	}
	
	render(){
		return(
			<Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Signup</Title>
                    </Body>
                    <Right />
                </Header>				
				<Content>
                    <View>
                        {this.state.error && <Text>{'Error: ' + this.state.error}</Text>}
                        {this.state.isFetching && <Text>{'Creating account...'}</Text>}
                        <SignUpForm
                            onSubmit={this.onFormSubmit}
                        />
                    </View>
                </Content>
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
        goHome: () => dispatch(NavigationActions.navigate({ routeName: 'Home' }))
    }
}

SignupScreen.propTypes = {
    //signup: React.PropTypes.object.isRequired,
    createAccount: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.object.isRequired
}

SignupScreen.navigationOptions = {
    header: null
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
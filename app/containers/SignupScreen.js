import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from '../components/SignupForm'
import { Container, Content, View, Header, Left, Right, Body, Title} from 'native-base'

class SignUp extends Component{
	constructor(props){
		super(props)

		this.onCreateAccountPressed = this.onCreateAccountPressed.bind(this)
    }

	onCreateAccountPressed(newUser){

		console.log('Save pressed', newUser.toJS())
		
	}
	
	render(){
		return(
			<Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Create Account</Title>
                    </Body>
                    <Right />
                </Header>				
				<Content>
                    <View>
                        <SignUpForm
                            onSubmit={this.onCreateAccountPressed}
                        />
                    </View>
                </Content>
            </Container>
		) 
	}
}

export default SignUp
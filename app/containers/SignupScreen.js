import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from '../components/SignupForm'
import { Container, Content, View, Header, Left, Right, Body, Title} from 'native-base'

class SignupScreen extends Component{
	constructor(props){
		super(props)

		this.onCreateAccountPressed = this.onCreateAccountPressed.bind(this)
    }

	onCreateAccountPressed(newUser){

		console.log('Save pressed')
		
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
                        <SignUpForm
                            onSubmit={this.onCreateAccountPressed}
                        />
                    </View>
                </Content>
            </Container>
		) 
	}
}

export default SignupScreen
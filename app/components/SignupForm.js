import React, { Component } from 'react'
import { Form, Button, Text } from 'native-base'
import { Field, reduxForm } from 'redux-form/immutable'
import TextInput from '../common/MyTextInput'

class SignupForm extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const { handleSubmit, onSubmit, dirty, submitting, invalid } = this.props
        //console.log('submitting', JSON.stringify(this.props))

        return(
            <Form>
                <Field
                    name="fullName"
                    component={TextInput}
                    placeholder="Full Name"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                <Field
                    name="email"
                    component={TextInput}
                    placeholder="Email"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!submitting}                    
                />

                <Field
                    name="phone"
                    component={TextInput}
                    placeholder="PHONE"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                <Field
                    name="userName"
                    component={TextInput}
                    placeholder="USERNAME"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                <Field
                    name="password"
                    component={TextInput}
                    placeholder="PASSWORD"
                    returnKeyType="next"
                    secureTextEntry
                    editable={!submitting}                    
                />
                
                <Button 
                    style={{marginTop: 15}}
                    onPress={handleSubmit(onSubmit)}
                    disabled={submitting || invalid}>
                    <Text>REGISTER</Text>
                </Button>
            </Form>                         
        )
    }
}

export default reduxForm({
    form: 'signup'
})((SignupForm))

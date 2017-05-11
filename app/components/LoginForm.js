import React, { Component } from 'react'
import { Text, Form, Button } from 'native-base'
import { Field, reduxForm, propTypes } from 'redux-form'
import TextInput from '../common/LoginTextInput'

class LoginForm extends Component{
    render(){
        const { handleSubmit, onSubmit, dirty, submitting, invalid, pristine } = this.props
        return(
            <Form>
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
                    name="password"
                    component={TextInput}
                    placeholder="PASSWORD"
                    returnKeyType="done"
                    secureTextEntry
                    editable={!submitting}                    
                />

                <Button 
                    style={{marginTop: 15}}
                    onPress={handleSubmit(onSubmit)}
                    disabled={pristine || submitting}>
                    <Text>LOGIN</Text>
                </Button>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    ...propTypes,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm)
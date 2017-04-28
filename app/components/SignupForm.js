import React, { Component } from 'react'
import { Form, Button, Text } from 'native-base'
import { Field, reduxForm, propTypes } from 'redux-form'
import TextInput from '../common/MyTextInput'
import validateForm from '../utils/validate'

class SignupForm extends Component {

    render(){
        const { handleSubmit, onSubmit, dirty, submitting, invalid, pristine } = this.props
        console.log('form props', this.props)

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
                    name="phoneNumber"
                    component={TextInput}
                    placeholder="PHONE"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                <Field
                    name="birthdate"
                    component={TextInput}
                    placeholder="DATE OF BIRTH"
                    returnKeyType="next"
                    editable={!submitting}
                />

                <Field
                    name="username"
                    component={TextInput}
                    placeholder="USERNAME"
                    returnKeyType="next"
                    autoCapitalize="none"
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
                    disabled={pristine || submitting}>
                    <Text>REGISTER</Text>
                </Button>
            </Form>                         
        )
    }
}

SignupForm.propTypes = {
    ...propTypes,
    onSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({ 
    form: 'signupForm',
    validate: validateForm
})((SignupForm))

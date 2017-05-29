import React, { Component } from 'react'
import { Form, Button, Text, View } from 'native-base'
import { Field, reduxForm, propTypes } from 'redux-form'
import TextInput from '../common/MyTextInput'
import validateForm from '../utils/validate'
import styles from '@assets/styles/signup'
import { Image } from 'react-native'

class SignupForm extends Component {

    render(){
        const { handleSubmit, onSubmit, dirty, submitting, invalid, pristine } = this.props

        return(
            <View>
                <Image source={require('@assets/images/profile.png')} style={styles.profileImg}/>
                <Text style={styles.registerTitle}>REGISTER</Text>

                <Form style={styles.registerForm}>
                <Field
                    name="fullName"
                    component={TextInput}
                    labelName="FULL NAME"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                <Field
                    name="email"
                    component={TextInput}
                    labelName="EMAIL"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!submitting}                    
                />

                <Field
                    name="phoneNumber"
                    component={TextInput}
                    labelName="PHONE"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                <Field
                    name="birthdate"
                    component={TextInput}
                    labelName="DATE OF BIRTH"
                    returnKeyType="next"
                    editable={!submitting}
                />

                <Field
                    name="username"
                    component={TextInput}
                    labelName="USERNAME"
                    returnKeyType="next"
                    autoCapitalize="none"
                    editable={!submitting}
                />

                <Field
                    name="password"
                    component={TextInput}
                    labelName="PASSWORD"
                    returnKeyType="done"
                    secureTextEntry
                    editable={!submitting}                    
                />
                
                <Button 
                    primary style={styles.buttonRegister}
                    onPress={handleSubmit(onSubmit)}
                    disabled={pristine || submitting}>
                    <Text>Register</Text>
                </Button>
                </Form>   
            </View>
                                  
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
})(SignupForm)

import React, { Component } from 'react'
import { Text, Form, Button, View } from 'native-base'
import { Field, reduxForm, propTypes } from 'redux-form'
import TextInput from '../common/MyTextInput'
import { emailValidationResult, validateFieldIsNotEmpty } from '../utils/validate'
import styles from '@assets/styles/signup'
import { Image } from 'react-native'

class LoginForm extends Component{
    render(){
        const { handleSubmit, onSubmit, dirty, submitting, invalid, pristine } = this.props
        return(
            <View>
             <Image source={require('@assets/images/profile.png')} style={styles.profileImg}/>
                <Text style={styles.registerTitle}>SIGN IN</Text>
            <Form tyle={styles.registerForm}>
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
                    <Text>LOGIN</Text>
                </Button>
            </Form>
            </View>
        )
    }
}

LoginForm.propTypes = {
    ...propTypes,
    onSubmit: React.PropTypes.func.isRequired
}


export default reduxForm({
    form: 'loginForm',
    validate: values => {
        let { email, password } = values
        const errros = {}

        errros.email = emailValidationResult(email)
        errros.password = validateFieldIsNotEmpty(password)

        return errros
    }

})(LoginForm)
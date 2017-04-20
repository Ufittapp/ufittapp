import React, { Component } from 'react'
import { Form, Button, Text } from 'native-base'
import { Field, reduxForm } from 'redux-form/immutable'
import TextInput from '../common/MyTextInput'

export default class SignupForm extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const { handleSubmit, onSubmit, dirty, submitting, invalid } = this.props
        //console.log('submitting', JSON.stringify(this.props))

        return(
            <Form>
                <Field
                    name="firstName"
                    component={TextInput}
                    placeholder="Nombre"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                 <Field
                    name="lastName"
                    component={TextInput}
                    placeholder="Apellido"
                    returnKeyType="next"
                    autoCapitalize="words"                    
                    editable={!submitting}                    
                />

                <Field
                    name="email"
                    component={TextInput}
                    placeholder="Tú e-mail"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!submitting}                    
                />

                <Field
                    name="password"
                    component={TextInput}
                    placeholder="Contraseña"
                    returnKeyType="next"
                    secureTextEntry
                    editable={!submitting}                    
                />

                <Field
                    name="passwordAgain"
                    component={TextInput}
                    placeholder="Repite tú Contraseña"
                    returnKeyType="done"
                    secureTextEntry
                    editable={!submitting}                    
                />
                
                <Button 
                    style={{marginTop: 15}}
                    onPress={handleSubmit(onSubmit)}
                    disabled={submitting || invalid}>
                    <Text>CONTINUAR</Text>
                </Button>
            </Form>                         
        )
    }
}
import React from 'react'
import { Field, reduxForm, propTypes } from 'redux-form'
import { Form, Button, Text, View } from 'native-base'
import ProfileTextInput from '../common/ProfileTextInput'
import styles from '@assets/styles/signup'
import { connect } from 'react-redux'

class UserProfileForm extends React.Component{
    render(){
        console.log(JSON.stringify(this.props))
        const { handleSubmit, onSubmit, dirty, submitting, invalid, pristine, fullName } = this.props

        return(
            <Form style={styles.registerForm}>
                <Field
                    name="fullName"
                    component={ProfileTextInput}
                    labelName="FULL NAME"
                    returnKeyType="next"
                    autoCapitalize="words"
                    value={fullName}
                    editable={!submitting}
                />

                <Field
                    name="phoneNumber"
                    component={ProfileTextInput}
                    labelName="PHONE"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    autoCapitalize="words"
                    editable={!submitting}
                />

                <Field
                    name="birthdate"
                    component={ProfileTextInput}
                    labelName="DATE OF BIRTH"
                    returnKeyType="next"
                    editable={!submitting}
                />
                
                <Button 
                    primary style={styles.buttonRegister}
                    onPress={handleSubmit(onSubmit)}
                    disabled={submitting}
                    >
                    <Text>UPDATE</Text>
                </Button>
            </Form>   
        )
    }
}

UserProfileForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        initialValues: {
            fullName: ownProps.fullName
        }
    }
}

export default reduxForm({form: 'userProfileForm', enableReinitialize: true})(UserProfileForm)

//export default connect(mapStateToProps)(reduxForm({form: 'userProfileForm', enableReinitialize: true})(UserProfileForm))

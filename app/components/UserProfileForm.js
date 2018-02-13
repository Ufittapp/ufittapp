import React from 'react'
import { Field, reduxForm, propTypes } from 'redux-form'
import { Form, Button, Text, View } from 'native-base'
import ProfileTextInput from '../common/ProfileTextInput'
import styles from '@assets/styles/signup'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'

class UserProfileForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {date:"1960-01-01"}
      }
    render(){
        console.warn(JSON.stringify(this.props))
        const { handleSubmit, onSubmit, dirty, submitting, invalid, pristine, fullName, birthdate } = this.props

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

               
                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="DATE OF BIRTH"
                    format="YYYY-MM-DD"
                    name="birthdate"
                    minDate="1960-01-01"
                    maxDate="2018-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
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

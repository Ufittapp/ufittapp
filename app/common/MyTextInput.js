import React, { Component } from 'react'
import { Item, Input, Text, View, Icon, Label } from 'native-base'
import styles from '@assets/styles/signup'

class MyTextInput extends Component{
    render(){
        const { labelName, input, meta: { touched, error, dirty, invalid, valid }, ...inputProps} = this.props
        
        return(
            <View style={{marginTop: 30}}>
                <Item floatingLabel success={dirty && valid ? true : false} error={invalid && dirty ? true : false}>
                    <Label style={styles.registerLabel}>{labelName}</Label>
                    <Input
                        {...inputProps}
                        value={input.value}
                        onChangeText={input.onChange}
                        style={styles.registerInput}
                    />
                    {dirty && invalid ? <Icon name='close-circle' /> : dirty && valid ? <Icon name='checkmark-circle' /> : undefined}
                </Item>
                {dirty && error && <Text style={ { color: '#fff', fontSize: 15} }>{error}</Text>}
            </View>
        )
    }
}

MyTextInput.propTypes = {
    input: React.PropTypes.object.isRequired,
    meta: React.PropTypes.object.isRequired
}

export default MyTextInput
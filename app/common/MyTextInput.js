import React, { Component } from 'react'
import { Item, Input, Text, View, Icon } from 'native-base'

class MyTextInput extends Component{
    render(){
        const { input, meta: { touched, error, dirty, invalid, valid }, ...inputProps} = this.props
        
        return(
            <View>
                <Item success={dirty && valid ? true : false} error={invalid && dirty ? true : false}>
                    <Input
                        {...inputProps}
                        value={input.value}
                        onChangeText={input.onChange}
                    />
                    {dirty && invalid ? <Icon name='close-circle' /> : dirty && valid ? <Icon name='checkmark-circle' /> : undefined}
                </Item>
                {dirty && error && <Text style={ { color: '#e74c3c', fontSize: 15} }>{error}</Text>}
            </View>
        )
    }
}

MyTextInput.propTypes = {
    input: React.PropTypes.object.isRequired,
    meta: React.PropTypes.object.isRequired
}

export default MyTextInput
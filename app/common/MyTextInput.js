import React, { Component } from 'react'
import { Item, Input, Text, View, Icon } from 'native-base'

class MyTextInput extends Component{
    render(){
        const { input, meta: { touched, error, dirty, invalid, valid }, ...inputProps} = this.props
        console.log('field props', this.props)
        
        return(
            <Input
                {...inputProps}
                value={input.value}
                onChangeText={input.onChange}
            />
        )
    }
}

RFTextInput.propTypes = {
    input: React.PropTypes.object.isRequired,
    meta: React.PropTypes.object.isRequired
}

export default MyTextInput
import React, { Component } from 'react'
import { Item, Input, Text, View } from 'native-base'

class MyTextInput extends Component{
    render(){
        const { input, meta: { touched, error, dirty, invalid, valid }, ...inputProps} = this.props
        
        return(
            <View>
                <Item>
                    <Input
                        {...inputProps}
                        value={input.value}
                        onChangeText={input.onChange}
                    />
                    
                </Item>
            </View>
        )
    }
}

MyTextInput.propTypes = {
    input: React.PropTypes.object.isRequired,
    meta: React.PropTypes.object.isRequired
}

export default MyTextInput
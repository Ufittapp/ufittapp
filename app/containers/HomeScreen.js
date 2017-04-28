import React from 'react'
import { Text } from 'react-native'

class Home extends React.Component{
    render(){
        return <Text>Hi there!</Text>
    }
}

Home.navigationOptions = {
    title: 'Welcome Home'
}

export default Home
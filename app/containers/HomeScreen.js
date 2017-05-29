import React from 'react'
import { Text, Container, Content, Footer } from 'native-base'
import FooterTabs from '../common/FooterTabs'
import { connect } from 'react-redux'

class HomeScreen extends React.Component{
    render(){
        const { navigate } = this.props.navigation;

        return(
            <Container>
                <Content>
                    <Text>Feeds section</Text>
                </Content>
            </Container>
        )
    }
}

HomeScreen.propTypes = {
    navigation: React.PropTypes.object.isRequired
}

HomeScreen.navigationOptions = {
    header: null
}

export default HomeScreen //connect()
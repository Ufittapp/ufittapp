import React from 'react'
import { Text, Container, Content, Footer } from 'native-base'
import FooterTabs from '../common/FooterTabs'
import { connect } from 'react-redux'

class Home extends React.Component{
    render(){
        const { navigate } = this.props.navigation;

        return(
            <Container>
                <Content>
                    <Text>Feeds section</Text>
                </Content>
                <Footer>
                    <FooterTabs
                        activeTabName='home'
                        navigate={navigate}
                    />
                </Footer>
            </Container>
        )
    }
}

Home.propTypes = {
    navigation: React.PropTypes.object.isRequired
}

Home.navigationOptions = {
    header: null
}

export default Home //connect()
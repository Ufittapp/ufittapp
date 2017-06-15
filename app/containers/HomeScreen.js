import React from 'react'
import FooterTabs from '../common/FooterTabs'
import { connect } from 'react-redux'
import styles from '@assets/styles/home'
  import { Container, Content, ListItem, Text, CheckBox, Header, Left, Button, Icon, Body, Title, Right,
    InputGroup, Input, Form, Label, Item, Picker, Footer, FooterTab, Thumbnail} from 'native-base';
import { View, Image } from 'react-native'


class HomeScreen extends React.Component{
    static navigationOptions = {
        tabBarLabel: 'Feeds'
    }

    render(){
        const { navigate } = this.props.navigation;

        return(
            <Container>
                 <Header style={styles.headerBg}>
                     <Left />
                     <Body>
                         <Title style={styles.whiteText}>Feed</Title>
                     </Body>
                     <Right>
                         <Button transparent>
                             <Icon name='more' style={styles.whiteText} />
                         </Button>
                     </Right>
                 </Header>

                 <Content>
                    <View style={styles.feedContainer}>
                        <View style={styles.feedHeader}>

                            <View style={styles.userFeed}>

                              <View><Thumbnail size={40} source={require('@assets/images/feed_img.png')} /></View>
                                <View style={styles.userName}>
                                    <Text style={styles.boldName}>James Wilson</Text>
                                    <Text style={styles.status}>posted</Text>
                                </View>

                            </View>

                            <View style={styles.timeFeed}>
                              <Icon name='clock' style={styles.clockText} />
                              <Text style={styles.status}>2h</Text>
                            </View>

                        </View>

                        <View style={styles.feedSlide}>
                          <Image source={require('@assets/images/feed_img.png')} style={styles.feedImg}/>
                        </View>
                    </View>

                    <View style={styles.footerFeed}>
                        <View style={styles.iconContainer}>
                          <Icon name='heart' style={styles.footerFeedIcons} />
                          <Text style={styles.footerFeedText}>2K</Text>
                        </View>

                        <View style={styles.iconContainer}>
                          <Icon name='chatboxes' style={styles.footerFeedIcons} />
                          <Text style={styles.footerFeedText}>98</Text>
                        </View>

                        <View style={styles.iconContainer}>
                          <Icon name='md-share' style={styles.footerFeedIcons} />
                          <Text style={styles.footerFeedText}>69</Text>
                        </View>

                        <View style={styles.iconContainer}>
                          <Icon name='person' style={styles.footerFeedIcons} />
                          <Text style={styles.footerFeedText}>profile</Text>
                        </View>
                    </View>
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
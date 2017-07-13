import React from 'react'
import FooterTabs from '../common/FooterTabs'
import { connect } from 'react-redux'
import styles from '@assets/styles/home'
  import { Container, Content, ListItem, Text, CheckBox, Header, Left, Button, Icon, Body, Title, Right,
    InputGroup, Input, Form, Label, Item, Picker, Footer, FooterTab, Thumbnail, List} from 'native-base';
import { View, Image } from 'react-native'
import db from '../config/database'





class HomeScreen extends React.Component{
    static navigationOptions = {
        tabBarLabel: 'Feeds'
    }

    constructor(props) {
      super(props);
      this.state = { 

          usersArray: []
       };
  }
    componentWillMount(){

          var that = this;
          db.usersRef.on('value', function(snap){

            var users = [];
            snap.forEach(function(childsnaphot){
              var user = {
                fullname: childsnaphot.val().fullName,
              }

              users.push(user);

            }.bind(this));

              
              that.setState({
                  usersArray: users
              });



        }.bind(this));
 
    }

    userList() {
      return this.state.usersArray.map((data, index) => {
        return (
                <View key={index}>
                   <View style={styles.feedContainer}>
                        <View style={styles.feedHeader}>

                            <View style={styles.userFeed}>

                              <View><Thumbnail size={40} source={require('@assets/images/feed_img.png')} /></View>
                                <View style={styles.userName}>
                                    <Text style={styles.boldName}>{data.fullname}</Text>
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
                </View>
            )
       
      })
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

                    {this.userList()}
                 
                  
                   
                 </Content>

                 </Container>
        )
    }
}

HomeScreen.propTypes = {
    navigation: React.PropTypes.object.isRequired
}

HomeScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='home' />
    ),
}


export default HomeScreen //connect()( )

import React from 'react'
    import { Container, Content, ListItem, Text, CheckBox, Header, Left, Button, Icon, Body, Title, Right,
    InputGroup, Input, Form, Label, Item, Picker, Footer, FooterTab, Thumbnail} from 'native-base';
    import {Image, StyleSheet, View, Dimensions} from 'react-native';
    import { connectStyle } from 'native-base';

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;



    class App extends React.Component{

         render(){

             return (


               <Container>
                 <Header style={styles.headerBg}>
                     <Left>
                         <Button transparent>
                             <Icon name='menu' style={styles.whiteText} />
                         </Button>
                     </Left>
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


             );
         }
     }


     const styles = {


         headerBg: {
           backgroundColor: '#212121',
         },

         whiteText: {
           color: '#ffffff'
         },

         footerBg: {
           backgroundColor: '#7a1405'
         },

         feedContainer: {
           marginTop: 15,
           marginBottom: 15
         },

         feedHeader: {
           margin: 15,
           flexDirection: 'row'
         },

         userFeed: {
           flex: 1,
           flexDirection: 'row',
           alignItems: 'flex-start',
         },

         timeFeed: {
           width: 50,
           flexDirection: 'row',
           justifyContent: 'flex-end',
           alignItems: 'flex-start'
         },

         userName: {
           marginLeft: 10
         },

         boldName: {
           color: '#7d7885',
           fontWeight: 'bold',
           fontSize: 15
         },

         status: {
           color: '#beb9c1',
           fontSize: 13,
           fontWeight: 'bold'
         },
         clockText: {
           color: '#beb9c1',
           fontSize: 18,
           fontWeight: 'bold',
           marginRight: 5
         },
         feedImg: {
           height: 220,
           width: deviceWidth
         },

         footerFeedIcons: {
           color: '#7d7885',
           fontWeight: 'bold',
           fontSize: 24
         },

         footerFeedText: {
           color: '#7d7885',
           fontWeight: 'bold',
           fontSize: 14,
           marginLeft: 5,
         },

         footerFeed: {
           margin: 15,
           flexDirection: 'row',
           marginTop: 0
         },

         iconContainer: {
           flexDirection: 'row',
           width: deviceWidth / 4,
           alignItems: 'center',
         }


     };

export default App
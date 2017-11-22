import React from 'react'
import { Container, Content, ListItem, Text, CheckBox, Header, Left, Button, Icon, Body, Title, Right,
InputGroup, Input, Form, Label, Item } from 'native-base';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import { connectStyle } from 'native-base';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

 class App extends React.Component{
      render(){

        const styles = this.props.style;

          return (


            <Container>
              <Header style={styles.headerBg}>
                  <Left>
                      <Button transparent>
                          <Icon name='menu' style={styles.whiteText} />
                      </Button>
                  </Left>
                  <Body>
                      <Title style={styles.whiteText}>Create Profile</Title>
                  </Body>
                  <Right>
                      <Button transparent>
                          <Icon name='more' style={styles.whiteText} />
                      </Button>
                  </Right>
              </Header>

              <Image source={require('@assets/images/register_bg.png')} style={styles.backgroundImage}>
                  <Content>

                    <Image source={require('@assets/images/profile.png')} style={styles.profileImg}/>

                    <Text style={styles.registerTitle}>REGISTER</Text>

                  <Form style={styles.registerForm}>
                          <Item stackedLabel style={styles.itemContainer}>
                              <Label style={styles.registerLabel}>FULL NAME</Label>
                              <Input style={styles.registerInput} />
                          </Item>
                          <Item stackedLabel style={styles.itemContainer}>
                              <Label style={styles.registerLabel}>EMAIL</Label>
                              <Input style={styles.registerInput} />
                          </Item>
                          <View style={styles.registerWrap}>
                              <Item stackedLabel style={styles.itemContainerWrap}>
                                  <Label style={styles.registerLabel}>PHONE</Label>
                                  <Input style={styles.registerInput} />
                              </Item>
                              <Item stackedLabel style={styles.itemContainerWrap}>
                                  <Label style={styles.registerLabel}>DATE OF BIRTH</Label>
                                  <Input style={styles.registerInput} />
                              </Item>
                          </View>
                          <Item stackedLabel style={styles.itemContainer}>
                              <Label style={styles.registerLabel}>USERNAME</Label>
                              <Input style={styles.registerInput} />
                          </Item>
                          <Item stackedLabel>
                              <Label style={styles.registerLabel}>PASSWORD</Label>
                              <Input style={styles.registerInput} />
                          </Item>

                          <Button primary style={styles.buttonRegister}>
                           <Text> Register </Text>
                         </Button>
                      </Form>

                  </Content>
              </Image>

              </Container>


          );
      }
  }



  const styles = {
    registerLabel: {
      fontSize: 12,
      color: '#b5afaf',
    },

    itemContainer: {
      marginBottom: 5
    },

    itemContainerWrap: {
        marginBottom: 5,
        width: 160,
    },

    registerForm: {
      margin: 20,
      marginLeft: 5
    },

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      width: null,
      height: null,

    },

    buttonRegister: {
      alignSelf: 'center',
      marginTop: 15,
      backgroundColor: '#5a1d12',
      opacity: 0.9,

    },

    profileImg: {
      alignSelf: 'center',
      marginTop: 15
    },
    registerTitle: {
      fontSize: 20,
      color: '#d6d7d7',
      textAlign: 'center',
      marginTop: 15,
      fontWeight: '500',
      letterSpacing: 3
    },

    registerWrap: {
      flexDirection: 'row',
      },

      registerInput:{
        color: '#ffffff'
      },

      headerBg: {
        backgroundColor: '#212121',
      },

      whiteText: {
        color: '#ffffff'
      }
  };

  export default connectStyle('yourTheme.App', styles)(App); 
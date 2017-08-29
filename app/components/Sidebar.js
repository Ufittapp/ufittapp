import React, { Component } from 'react';
import { Text, Icon, Container, List, Switch, Item as FormItem, Content, Form, Label, Item, Input, Toast, Button, ListItem, Thumbnail, Card, CardItem, Left, Body, Right, Radio} from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View, Platform } from 'react-native'
import FirebaseImageManager from '../utils/FirebaseImageManager'
import { connect } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../actions/'
import firebase from 'firebase'
import styles from '@assets/styles/profile'
import ImagePicker from 'react-native-image-picker'
import ProfileImage from '../components/ProfileImage'
import HideableView from 'react-native-hideable-view';



var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


class SideBar extends Component {


    constructor(props){
        super(props)

        this.pickImageFromDevice = this.pickImageFromDevice.bind(this)

        this.state = {
            imageUri: 'http://via.placeholder.com/350x150',
            initialValues:{
                fullName: '',
                phoneNumber: '',
                birthdate: ''
            },
          isImagePickerShowing: false,
          selected2: undefined,
           visible: false

        };
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        });
    }

    onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

      componentDidMount(){
        const currentUserId = firebase.auth().currentUser.uid

        this.props
        .dispatch(fetchUserProfile(currentUserId))
        .then(userSnap => {
            const user = userSnap.val()
            this.setState({
                initialValues:{
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    birthdate: user.birthdate
                }
            })
        })

     
    }

    componentWillMount(){
        FirebaseImageManager
        .getUserProfileImage()
        .then(url => this.setState({imageUri: url}))
        .catch(error => console.log(error))
        
    }

     pickImageFromDevice(){
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };
                // this.setState({image_uri: response.uri})

                // You can also display the image using data:
                // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

            FirebaseImageManager
                .uploadImageToStorage(response.uri)
                .then(url => { 
                    console.log('uploaded', url); 
                    this.setState({imageUri: url}) })
                .catch(error => console.log(error))
            }
        })
    }

  render() {
   
    return (
      <Container style={{ backgroundColor: '#550e03' }}>
                <Content >
                      <View style={styles.genreSelector}>
                          <View style={styles.uploadView}>
                            
                            <ProfileImage></ProfileImage> 


                            <Text style={styles.uploadText}>update</Text>
                          </View>
                          <View style={styles.userInfo}>
                            <Text style={styles.userFullName}>{this.state.initialValues.fullName}</Text>
                            <Text style={styles.ageText}>Age: 37</Text>
                            <Text style={styles.ageText}>Nicaragua</Text>
                            <Text style={styles.ageText}>USA Fittness, SE</Text>
                          </View>
                      </View> 

                        <List style={{ margin: 10, paddingTop: 30 }}>
                          <ListItem icon>
                           
                            <Body>
                              <Button transparent onPress={() => { this.toggle()}} style={{ paddingLeft: 0}}>
                                <Text style= {styles.userFullName}>PRIMARY ACTIVITY</Text>
                              </Button>

                            </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>

                          </ListItem>
                           <HideableView visible={this.state.visible} removeWhenHidden={true}>
                            <List>
                               <ListItem>
                                  <Text style={styles.ageText}>Crossfit</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>Strength & Conditioning</Text>
                                  <Right>
                                    <Radio selected={true} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>Olimpic Lifting</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>Triathlons</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>OCR</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>Running</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>Cycling</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>Swimming</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                                <ListItem>
                                  <Text style={styles.ageText}>Other</Text>
                                  <Right>
                                    <Radio selected={false} />
                                  </Right>
                                </ListItem>
                              </List>
                          </HideableView>

                          <ListItem icon>
                           
                            <Body>
                              <Text style= {styles.userFullName}>SECONDARY ACTIVITY</Text>
                            </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>
                          </ListItem>

                          <ListItem icon>
                           
                            <Body>
                              <Text style= {styles.userFullName}>GOALS</Text>
                            </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>
                          </ListItem>

                          <ListItem icon>
                           
                            <Body>
                              <Text style= {styles.userFullName}>FITNESS STATS</Text>
                            </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>
                          </ListItem>

                          <ListItem icon>
                           
                            <Body>
                              <Text style= {styles.userFullName}>CHALLENGES</Text>
                            </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>
                          </ListItem>
              
                      </List>

                     
                </Content>
            </Container>
    );
  }
}

export default connect()(SideBar)
import React, { Component } from 'react';
import { Text, Icon, Container, List, Switch, Item as FormItem, Content, Form, Label, Item, Input, Toast, Button, ListItem, Thumbnail, Card, CardItem, Left, Body, Right} from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View, Platform } from 'react-native'
import FirebaseImageManager from '../utils/FirebaseImageManager'
import { connect } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../actions/'
import firebase from 'firebase'
import styles from '@assets/styles/profile'
import ImagePicker from 'react-native-image-picker'

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
          selected2: undefined

        }
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
                            
                    <TouchableWithoutFeedback style={{alignItems: 'center'}}
                         onPress={this.pickImageFromDevice}>
                        <Image
                            style={{width: 100, height: 100, borderRadius: 50}}
                            source={{uri: this.state.imageUri}} />
                    </TouchableWithoutFeedback>

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
                              <Text style= {styles.userFullName}>PRIMARY ACTIIVITY</Text>
                            </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>
                          </ListItem>

                          <ListItem icon>
                           
                            <Body>
                              <Text style= {styles.userFullName}>SECONDARY ACTIIVITY</Text>
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
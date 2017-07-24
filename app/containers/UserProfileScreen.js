import React from 'react'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button } from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View } from 'react-native'
var ImagePicker = require('react-native-image-picker');
import FirebaseImageManager from '../utils/FirebaseImageManager'
import { connect } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../actions/'
import firebase from 'firebase'
import UserProfileForm from '../components/UserProfileForm'
import styles from '@assets/styles/profile'


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

class UserProfileScreen extends React.Component{
    constructor(props){
        super(props)

        this.pickImageFromDevice = this.pickImageFromDevice.bind(this)
        this.onUpdatePressed = this.onUpdatePressed.bind(this)

        this.state = {
            imageUri: 'http://via.placeholder.com/350x150',
            initialValues:{
                fullName: '',
                phoneNumber: '',
                birthdate: ''
            }
        }
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

    onUpdatePressed(data){
        const { fullName, phoneNumber, birthdate } = data
        const currentUserId = firebase.auth().currentUser.uid        

        this.props.dispatch(updateUserProfile(currentUserId, fullName, phoneNumber, birthdate))
        .then(() =>{
            Toast.show({
              text: 'Profile updated!',
              position: 'bottom',
              buttonText: 'Okay'
            })
        })
    }

    render(){
        return (
        <Image source={require('@assets/images/create_profile_bg.png')} style={styles.backgroundImage}>
            <Container >
                <Content >
                     <Text style={styles.registerTitle}>PROFILE</Text>
                      <View style={styles.genreSelector}>
                          <View style={styles.uploadView}>
                            
                    <TouchableWithoutFeedback style={{alignItems: 'center'}}
                         onPress={this.pickImageFromDevice}>
                        <Image
                            style={{width: 100, height: 100, borderRadius: 50}}
                            source={{uri: this.state.imageUri}} />
                    </TouchableWithoutFeedback>

                            <Text style={styles.uploadText}>Upload</Text>
                          </View>
                          <View style={styles.userInfo}>
                            <Text style={styles.userFullName}>{this.state.initialValues.fullName}</Text>
                            <Text style={styles.ageText}>Age: 37</Text>
                          </View>
                      </View>

                         <View style={styles.genreSelector}>
                            <Button full info style={styles.maleButton}>
                            <Text style={styles.genreText}> Male </Text>
                            </Button>
                            <Button full info style={styles.femaleButton}>
                            <Text style={styles.genreText}> Female </Text>
                            </Button>
                      </View>



                    <UserProfileForm 
                        initialValues={this.state.initialValues}
                        onSubmit={this.onUpdatePressed} />

                </Content>
            </Container>
        </Image>
        )
    }
}

UserProfileScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='person' style={{ color: '#ffffff', opacity: 1}} />
    ),
}

export default connect()(UserProfileScreen)
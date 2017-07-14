import React from 'react'
import { Text, Icon, Container, Content } from 'native-base'
import { TouchableWithoutFeedback, Image } from 'react-native'
var ImagePicker = require('react-native-image-picker');
import FirebaseImageManager from '../utils/FirebaseImageManager'

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

        this.state = {
            imageUri: 'http://via.placeholder.com/350x150'
        }
    }

    pickImageFromDevice(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

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


    render(){
        return (
            <Container style={{alignItems: 'center'}}>
                <Content >
                    <TouchableWithoutFeedback onPress={this.pickImageFromDevice}>
                        <Image
                            style={{width: 100, height: 100, borderRadius: 50}}
                            source={{uri: this.state.imageUri}} />
                    </TouchableWithoutFeedback>
                </Content>
            </Container>
        )
    }
}

UserProfileScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='person' />
    ),
}

export default UserProfileScreen
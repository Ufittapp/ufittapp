import React from 'react'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, ListItem, Thumbnail, Card, CardItem, Left, Body, Right} from 'native-base'
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
     static navigationOptions = {
        tabBarLabel: 'UserProfile'
  }
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
            },
          userInfo: []

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

        var that = this;
        db.videosRef.orderByChild('userId').equalTo(currentUserId).on('child_added', function(snapshot){
            var user = {
                    likes_count:  snapshot.val().likes_count,
                    shares: snapshot.val().shares_count,
                    thumbnailUrl: snapshot.val().thumbnail,
                    time: snapshot.val().uploaded_date,
                    comments: snapshot.val().comments_count,
                    userId: snapshot.val().userId,
                    username: snapshot.val().username,
                }

            that.setState({
                userInfo: user
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

    userCard(){

         Object.size = function(obj) {
          var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
             }
            return size;
        };
        return  <Card >
            <CardItem>
              <Left>
             
                <Thumbnail source={require('@assets/images/feed_img.png')} />
                <Body>        
                  <Text>{this.state.initialValues.fullName}</Text>
                  <Text note style={styles.status}>posted</Text>
                </Body>
              </Left>
              <Right>
               <Button transparent>

                    <Icon name='clock' style={styles.clockText} />
                    <Text style={styles.status}>{this.state.userInfo.time}h</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.state.userInfo.thumbnailUrl }} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                 <Button transparent >
                  <Icon  name="thumbs-up" style={styles.clockText} />
                  <Text style={styles.status}> {Object.size(this.state.userInfo.likes_count)} Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon  name="chatbubbles" style={styles.clockText} />
                  <Text style={styles.status}>{this.state.userInfo.comments} Comments</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent>

                    <Icon  name="md-share" style={styles.clockText} />
                    <Text style={styles.status}>{this.state.userInfo.shares}</Text>
                </Button>
              </Right>
            </CardItem>


          </Card>
            
    }

    render(){
        console.log(this.state.userInfo);
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

                        {this.userCard()}

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
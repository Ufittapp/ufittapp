import React from 'react'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, ListItem, Thumbnail, Card, CardItem, Left, Body, Right} from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View, Platform } from 'react-native'
//import FirebaseImageManager from '../utils/FirebaseImageManager'
import { connect } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../actions/'
import firebase from 'firebase'
import UserProfileForm from '../components/UserProfileForm'
import styles from '@assets/styles/profile'
import Upload from 'react-native-background-upload'
import ImagePicker from 'react-native-image-picker'
import ProfileImage from '../components/ProfileImage'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { NavigationActions } from 'react-navigation';





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

        //this.pickImageFromDevice = this.pickImageFromDevice.bind(this)
        this.onUpdatePressed = this.onUpdatePressed.bind(this)

        this.state = {
            imageUri: 'http://via.placeholder.com/350x150',
            initialValues:{
                fullName: '',
                phoneNumber: '',
                birthdate: ''
            },
          userInfo: [],
          isImagePickerShowing: false
        }
    }

   

 

    onPressUpload = () => {
    if (this.state.isImagePickerShowing) {
      return
    }

    this.setState({ isImagePickerShowing: true })

    const options = {
      mediaType: 'photo',
      takePhotoButtonTitle: null,
      videoQuality: 'high',
      title: 'Choose an image...',
      chooseFromLibraryButtonTitle: 'Choose From Library'
    }

    ImagePicker.showImagePicker(options, (response) => {
      let didChooseVideo = true

      console.log('ImagePicker response: ', response)
      const { customButton, didCancel, error, path, uri } = response

      if (didCancel) {
        didChooseVideo = false
      }

      if (error) {
        console.warn('ImagePicker error:', response)
        didChooseVideo = false
      }

      this.setState({ isImagePickerShowing: false })

      if (!didChooseVideo) {
        return
      }

      if (Platform.OS === 'android') {
        if (path) { 
          console.log(path);
          //this.startUpload(path)
         this.props.navigation.navigate('Publish', {path: path})
        } else {  
          this.props.onVideoNotFound()
        }
      } else {
        //this.startUpload(uri)
        this.props.navigation.navigate('Publish', {path: uri})

      }
    })
  }

   

   onPressVideoUpload = () => {
    if (this.state.isImagePickerShowing) {
      return
    }

    this.setState({ isImagePickerShowing: true })

    const options = {
      mediaType: 'video',
      takePhotoButtonTitle: null,
      videoQuality: 'high',
      title: 'Choose a video...',
      chooseFromLibraryButtonTitle: 'Choose From Library'
    }

    ImagePicker.showImagePicker(options, (response) => {
      let didChooseVideo = true

      console.log('ImagePicker response: ', response)
      const { customButton, didCancel, error, path, uri } = response

      if (didCancel) {
        didChooseVideo = false
      }

      if (error) {
        console.warn('ImagePicker error:', response)
        didChooseVideo = false
      }

      this.setState({ isImagePickerShowing: false })

      if (!didChooseVideo) {
        return
      }

      if (Platform.OS === 'android') {
        if (path) { 
          console.log(path);
          //this.videoUpload(path)
         this.props.navigation.navigate('PublishVideo', {path: path})

        } else {  
          this.props.onVideoNotFound()
        } 
      } else {
        //this.videoUpload(uri)
        this.props.navigation.navigate('PublishVideo', {path: path})

      }
    })
  }
    componentDidMount(){
      console.log(Platform.OS);
      
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
        // FirebaseImageManager
        // .getUserProfileImage()
        // .then(url => this.setState({imageUri: url}))
        // .catch(error => console.log(error))

         const currentUserId = firebase.auth().currentUser.uid

           var that = this;
        db.videosRef.orderByChild('userId').equalTo(currentUserId).on('value', function(snapshot){
          var items = [];
          snapshot.forEach(function(snap){
                var user = {
                    
                    thumbnailUrl: snap.val().thumbnail,
                    time: snap.val().uploaded_date,
                    
                }
                items.push(user);
          });
          

            that.setState({
                userInfo: items
            });

        })
        
    }

    // pickImageFromDevice(){
    //     ImagePicker.showImagePicker(options, (response) => {
    //         //console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         }
    //         else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         }
    //         else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         }
    //         else {
    //             // let source = { uri: response.uri };
    //             // this.setState({image_uri: response.uri})

    //             // You can also display the image using data:
    //             // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

    //         FirebaseImageManager
    //             .uploadImageToStorage(response.uri)
    //             .then(url => { 
    //                 console.log('uploaded', url); 
    //                 this.setState({imageUri: url}) })
    //             .catch(error => console.log(error))
    //         }
    //     })
    // }

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

    returnTime(previousTime){
      timeNeeded = Date.now() - previousTime;
      inMinutes = (timeNeeded/1000) / 60;
      if (inMinutes < 20) {
        return parseInt(inMinutes) + " minutes ago";
      } else if (inMinutes < 40) {
        return "about 30 minutes ago";
      } else if (inMinutes < 80) {
        return "about an hour ago";
      } else if (inMinutes > 1380 && inMinutes < 2760) {
        return "a day ago";
      } else if (inMinutes < 1380) {
        hours = parseInt(inMinutes/60);
        return "about " + hours + " hours ago";
      } else {
        var date = new Date(previousTime);
        return date.toDateString();
      }

    }


    displayMedia(url){

        if (url.endsWith(".mp4")) {
            return <VideoPlayer
                  
                    source={{uri: url}}
                    style={styles.videoBg}
                        navigator={ this.props.navigator }

                  />

        } else{
          return <Image source={{uri: url }} style={{height: 200, width: null, flex: 1}}/>


        }

    }

    userCard(){

          return this.state.userInfo.map((data, index) => {
           
                    return (

               <Card key={index}>
            <CardItem>
             
              <Right>
               <Button transparent>

                    <Icon name='clock' style={styles.clockText} />
                    <Text style={styles.status}>{this.returnTime(data.time)}</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem cardBody>
              {this.displayMedia(data.thumbnailUrl)}
            </CardItem>
           


          </Card>
              )
                
            
          })
            
    }

    render(){
      console.log(this.state.userInfo.reverse());
        return (
        <Image source={require('@assets/images/create_profile_bg.png')} style={styles.backgroundImage}>
            <Container >
                <Content >
                     <Text style={styles.registerTitle}>PROFILE</Text>
                      <View style={styles.genreSelector}>
                          <View style={styles.uploadView}>
                            
                    <ProfileImage></ProfileImage> 

                            <Text style={styles.uploadText}>Upload</Text>
                          </View>
                          <View style={styles.userInfo}>
                            <Text style={styles.userFullName}>{this.state.initialValues.fullName}</Text>
                            {/* <Text style={styles.ageText}>Age: 37</Text> */}
                          </View>
                      </View>

                         <View style={styles.genreSelector}>
                         

                            <Button full info style={styles.maleButton}  onPress={this.onPressUpload}>
                            <Text style={styles.genreText}> Photo </Text>
                            </Button>
                            <Button full info style={styles.femaleButton} onPress={this.onPressVideoUpload}>
                            <Text style={styles.genreText}> Video </Text>
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
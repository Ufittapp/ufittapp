import React from 'react'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, ListItem, Thumbnail, Card, CardItem, Left, Body, Right} from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import styles from '@assets/styles/profile'
import Upload from 'react-native-background-upload'
import ImagePicker from 'react-native-image-picker'
import db, { firebaseAuth } from '../config/database'



class ProfileImage extends React.Component{
   
    constructor(props){
        super(props)
        this.state = {
            imageUri: 'https://via.placeholder.com/350x150',
          
          isImagePickerShowing: false
        }
    }

   

  startUpload = (path) => {
    console.warn(path);
  const senderID = firebase.auth().currentUser.uid

    const options = {
      path,
      url: 'https://ufitt.senorcoders.com/profile/?senderID=' + senderID + '&path=' + path,
      method: 'POST',
      headers: {
      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      //Below are options only supported on Android
      notification: {
        enabled: true
      }
    }

    Upload.startUpload(options).then((uploadId) => {
      console.log('Upload started')
      Upload.addListener('progress', uploadId, (data) => {
        console.log(`Progress: ${data.progress}%`)
      })
      Upload.addListener('error', uploadId, (data) => {
        console.log(`Error: ${data.error}%`)
      })
      Upload.addListener('completed', uploadId, (data) => {
        console.log('Completed!')
      })
    }).catch(function(err) {
      console.log('Upload error!', err)
    })
  }

    onPressUpload = () => {
    if (this.state.isImagePickerShowing) {
      return
    }

    this.setState({ isImagePickerShowing: true })

    const options = {
  title: 'Select Avatar',
  
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
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
          this.startUpload(path)
        } else {  
          this.props.onVideoNotFound()
        }
      } else {
        this.startUpload(uri)
      }
    })
  }


  componentWillMount(){
      const currentUserId = firebase.auth().currentUser.uid;
      var that = this;

      //To update image when user upload a new Profile Picture
      db.usersRef.orderByChild('userId').equalTo(currentUserId).on("child_changed", function(snapshot){
          var imageUri = snapshot.val().profileMedia;

          that.setState({
              imageUri: imageUri
          })
      }.bind(this))

      //To Load the images on Render
      db.usersRef.orderByChild('userId').equalTo(currentUserId).on("child_added", function(snapshot){
          var imageUri = snapshot.val().profileMedia;

          that.setState({
              imageUri: imageUri || 'https://via.placeholder.com/350x150'
          })
      }.bind(this))
  }


    render(){
      console.log(this.state.imageUri);
        return (
                    
                    <TouchableWithoutFeedback style={{alignItems: 'center'}}
                         onPress={this.onPressUpload}>
                        <Image
                            style={{width: 100, height: 100, borderRadius: 50}}
                            source={{uri: this.state.imageUri}} />
                    </TouchableWithoutFeedback>
                    )                         
    }
}



export default ProfileImage
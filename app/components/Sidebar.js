import React, { Component } from 'react';
import { Text, Icon, Container, List, Switch, Item as FormItem, Content, Form, Label, Item, Input, Toast, Button, ListItem, Thumbnail, Card, CardItem, Left, Body, Right, Radio} from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View, Platform, Alert } from 'react-native'
//import FirebaseImageManager from '../utils/FirebaseImageManager'
import { connect } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../actions/'
import firebase from 'firebase'
import styles from '@assets/styles/profile'
import ImagePicker from 'react-native-image-picker'
import ProfileImage from '../components/ProfileImage'
import HideableView from 'react-native-hideable-view';
import db, { firebaseAuth } from '../config/database'




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

        //this.pickImageFromDevice = this.pickImageFromDevice.bind(this)

        this.state = {
            imageUri: 'http://via.placeholder.com/350x150',
            initialValues:{
                fullName: '',
                phoneNumber: '',
                birthdate: ''
            },
          isImagePickerShowing: false,
          selected2: undefined,
           visible: false,
           visibleSecond: false,
           activities: [],
           visibleGoals: false,
           selected: false,
           primaryGoal: "",
           secondaryGoal: "",
           primaryText: "",
           secondaryText: "",
           primaryActivity: "",
           secondaryActivity: ""

        };
        this.toggle = this.toggle.bind(this);
        this.toggleSecond = this.toggleSecond.bind(this);
        this.toggleGoals = this.toggleGoals.bind(this);
        this.selectActivity = this.selectActivity.bind(this);

    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleSecond() {
        this.setState({
            visibleSecond: !this.state.visibleSecond
        });
    }

    toggleGoals() {
        this.setState({
            visibleGoals: !this.state.visibleGoals
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
      const currentUserId = firebase.auth().currentUser.uid

       var that = this;
        db.rootRef.child('activities').on('value', function(snapshot){
          var activities = [];
            snapshot.forEach(function(datasnapshot){
                var activity = {
                    activity: datasnapshot.val().activity
                }
                activities.push(activity);
            }.bind(this));

            that.setState({
              activities: activities
            })

        }.bind(this))

        // FirebaseImageManager
        // .getUserProfileImage()
        // .then(url => this.setState({imageUri: url}))
        // .catch(error => console.log(error))

        db.rootRef.child('users-activities').child(currentUserId).on('value', function(snap){
            console.log("Exis", snap.exists());
            if (snap.exists() == true) {
                   db.rootRef.child('users-activities').child(currentUserId).on('value', function(snap){
                         that.setState({
                            primaryActivity: snap.val().primary || 'Choose one',
                            secondaryActivity: snap.val().secondary || 'Choose one',
                            primaryText: snap.val().primaryGoal,
                            secondaryText: snap.val().secondaryGoal
                         })           
                })
              
            } 
        })
        
    }

    //  pickImageFromDevice(){
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

    selectActivity(activity, kind){
       const currentUserId = firebase.auth().currentUser.uid
       if (kind == 'primary') {
          db.rootRef.child('users-activities').child(currentUserId).update({
            primary: activity,
            userId: currentUserId
        })

        {this.toggle()}
       } else{
        db.rootRef.child('users-activities').child(currentUserId).update({
            secondary: activity,
            userId: currentUserId
        })

        {this.toggleSecond()}
       }

        

    }

    getItems(kind){
      return this.state.activities.map((data, index) => {
        return (
                 <ListItem key={index} onPress={()=> {this.selectActivity(data.activity, kind)}}>
                    <Text style={styles.ageText}>{data.activity}</Text>
                     <Right>
                      <Radio selected={this.state.selected}   />
                     </Right>
                 </ListItem>
          )
      })
    }


    saveGoals(primaryGoal, secondaryGoal){
        const currentUserId = firebase.auth().currentUser.uid;
        var that = this;
        if (primaryGoal != "") {
        db.rootRef.child('users-activities').child(currentUserId).on('value', function(snapshot){
            if (snapshot.exists() != true) {
                 Alert.alert(
                          'Activities not defined',
                          'You need to choose your activities above',
                          [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                        )
            } else{
                if (secondaryGoal != "") {
                      db.rootRef.child('users-activities').child(currentUserId).update({
                      primaryGoal: that.state.primaryGoal,
                      secondaryGoal: that.state.secondaryGoal
                    })
                  } else {
                    db.rootRef.child('users-activities').child(currentUserId).update({
                      primaryGoal: that.state.primaryGoal
                    })

                  }
            }
        })
          
        }

    }

  render() {
    console.log("Hola", this.state.secondaryActivity);
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
                          <ListItem>
                           
                            <Body>
                              <Button transparent onPress={() => { this.toggle()}} style={{ paddingLeft: 0}}>
                                <Text style= {styles.userFullName}>PRIMARY ACTIVITY</Text>
                              </Button>
                              <Text style={styles.ageText}>{this.state.primaryActivity}</Text>

                            </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>

                          </ListItem>
                           <HideableView visible={this.state.visible} removeWhenHidden={true}>
                            <List>
                               {this.getItems('primary')}
                              </List>
                          </HideableView>


                          <ListItem>
                           
                            <Body>
                                <Button transparent onPress={() => { this.toggleSecond()}} style={{ paddingLeft: 0}}>
                                <Text style= {styles.userFullName}>SECONDARY ACTIVITY</Text>
                              </Button>
                               <Text style={styles.ageText}>{this.state.secondaryActivity}</Text>

                              </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>
                          </ListItem>
                          <HideableView visible={this.state.visibleSecond} removeWhenHidden={true}>
                            <List>
                               {this.getItems('secondary')}
                              </List>
                          </HideableView>

                          <ListItem icon>
                           
                            <Body>
                                <Button transparent onPress={() => { this.toggleGoals()}} style={{ paddingLeft: 0}}>
                                <Text style= {styles.userFullName}>GOALS</Text>
                                </Button>
                                </Body>
                            <Right>
                               <Icon name="ios-arrow-forward" />

                            </Right>
                          </ListItem>

                           <HideableView visible={this.state.visibleGoals} removeWhenHidden={true}>
                              <Form>
                                <Item floatingLabel>
                                  <Label style={styles.ageText}>Primary Goals:  {this.state.primaryText}</Label>
                                  <Input keyboardType="numeric" onChangeText={(primaryGoal) => this.setState({primaryGoal})}  />
                                </Item>
                                <Item floatingLabel last>
                                  <Label style={styles.ageText}>Secondary Goals: {this.state.secondaryText}</Label>
                                  <Input keyboardType="numeric" onChangeText={(secondaryGoal) => this.setState({secondaryGoal})} />
                                </Item>
                                <Button full bordered info onPress={() => {this.saveGoals(this.state.primaryGoal, this.state.secondaryGoal)}}>
                                  <Text>Set Goals</Text>
                                </Button>
                              </Form>
                          </HideableView>

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
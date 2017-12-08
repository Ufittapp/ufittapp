    import React from 'react'
     import { Container, Content, ListItem, Text, CheckBox, Header, Left, Button, Icon, Body, Title, Right,
     InputGroup, Input, Form, Label, Item, Picker, Footer, FooterTab, Thumbnail} from 'native-base';
     import {Image, StyleSheet, View, Dimensions, Platform} from 'react-native';
     import { connectStyle } from 'native-base';
     import { connect } from 'react-redux'
     import styles from '@assets/styles/publish'
     import Upload from 'react-native-background-upload'
     import { NavigationActions } from 'react-navigation';
     import firebase from 'firebase'






     const deviceWidth = Dimensions.get('window').width;
     const deviceHeight = Dimensions.get('window').height;

     class PublishView extends React.Component{

      constructor(props){
        super(props)


        this.state = {
            path: "",
            description: "",
            challenge: false

        };
        this.toggleCheck = this.toggleCheck.bind(this);

    }

        componentWillMount(){
           const {state} = this.props.navigation;
         console.log("Publish: ", state);
          this.setState({
              path: state.params.path
          })

        }

         startUpload = (path, description, challenge) => {
          const senderID = firebase.auth().currentUser.uid

        const options = {
        path,
        url: 'https://ufitt.provethisconcept.com/ufittapp/?platform='+ Platform.OS +'&senderID=' + senderID + '&path=' + path + '&description=' + description + '&challenge=' + challenge,
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

           this.props.navigation.navigate('Home');

    
   

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

        toggleCheck(){
          this.setState({
            challenge: !this.state.challenge

          })
        }

          render(){
            console.log("Desafio", this.state.challenge);


              return (


                <Container>
                  <Header style={styles.headerBg}>
                      <Left>
                          <Button transparent>
                              <Icon name='menu' style={styles.whiteText} />
                          </Button>
                      </Left>
                      <Body>
                          <Title style={styles.whiteText}>Publish</Title>
                      </Body>
                      <Right>
                          <Button transparent onPress={() => {this.startUpload(this.state.path, this.state.description, this.state.challenge)}}>
                              <Icon name='checkmark' style={styles.green} />
                          </Button>
                      </Right>
                  </Header>

                  <Content>

                  <InputGroup>

                      <Input placeholder='Write a comment...' style={styles.textAreaPublish} multiline={true} placeholderTextColor="#898f94"
                      onChangeText={(description) => this.setState({description})} />
                  </InputGroup>
                  <ListItem>

                      <CheckBox checked={this.state.challenge} onPress={() => {this.toggleCheck()}} />
                      <Body>
                        <Text>is It a challenge?</Text>
                      </Body>
                    </ListItem>
                     

                     <InputGroup>
                         <Icon name='navigate' style={{color:'#898f94'}}/>
                         <Input placeholder='Take a geolocation' style={styles.publishInput} placeholderTextColor="#898f94" />
                     </InputGroup>

                     <InputGroup>
                         <Icon name='ios-person' style={{color:'#898f94'}}/>
                         <Input placeholder='Check the friends' style={styles.publishInput} placeholderTextColor="#898f94"/>
                     </InputGroup>


                 </Content>


            </Container>


              );
          }
      }


PublishView.navigationOptions = {
    header: null,

}


export default connect()(PublishView)


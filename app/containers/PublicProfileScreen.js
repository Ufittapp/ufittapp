import React from 'react'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, Header, Left, Body, Title, Right } from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../actions/'
import firebase from 'firebase'
import UserProfileForm from '../components/UserProfileForm'
import styles from '@assets/styles/profile'



class PublicProfileScreen extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'PublicProfile'
  }
    constructor(props){
        super(props)


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

        const {state} = this.props.navigation;
        console.log(state.params.usuario);
        //const currentUserId = this.props.item.userId
        const currentUserId = state.params.usuario;


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

  

    render(){
        const {goBack} = this.props.navigation;


        return (
            <Container >
                <Header style={styles.headerBg}>
                  <Left>
                    <Button transparent onPress={() => goBack()}>
                      <Icon name='md-arrow-round-back' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Profile</Title>
                  </Body>
                  <Right />
                </Header>
                    <Image source={require('@assets/images/create_profile_bg.png')} style={styles.backgroundImage}>

                <Content >
                     <Text style={styles.registerTitle}>PROFILE</Text>
                      <View style={styles.genreSelector}>
                          <View style={styles.uploadView}>
                            
                   
                        <Image
                            style={{width: 100, height: 100, borderRadius: 50}}
                            source={{uri: this.state.imageUri}} />

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



                        <Form style={styles.registerForm}>
                            <Item stackedLabel style={styles.itemContainer}>
                                <Label style={styles.registerLabel}>NAME</Label>
                                <Input style={styles.registerInput} value={this.state.initialValues.fullName} editable={false} />
                            </Item>
                            <Item stackedLabel style={styles.itemContainer}>
                                <Label style={styles.registerLabel}>PHONE NUMBER</Label>
                                <Input style={styles.registerInput} value={this.state.initialValues.phoneNumber} editable={false} />
                            </Item>
                              <Item stackedLabel style={styles.itemContainer}>
                                <Label style={styles.registerLabel}>BIRTHDATE</Label>
                                <Input style={styles.registerInput} value={this.state.initialValues.birthdate} editable={false} />
                            </Item>
                          
            
                           
                        </Form>

                </Content>
                        </Image>

            </Container>
        )
    }
}

PublicProfileScreen.navigationOptions = {
    header: null,
}

export default connect()(PublicProfileScreen)
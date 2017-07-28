import React from 'react'
import { Text, Icon, Container, Content, Form, Label, Item, Input, Toast, Button, Header, Left, Body, Title, Right } from 'native-base'
import { TouchableWithoutFeedback, Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchUserProfile } from '../actions/'
import firebase from 'firebase'
import styles from '@assets/styles/profile'
import { followUser, amIFollowingUser, unFollowUser } from '../actions'
import db, { firebaseAuth } from '../config/database'





class PublicProfileScreen extends React.Component{
     static navigationOptions = {
        tabBarLabel: 'PublicProfile'
  }
    constructor(props){
        super(props)


        this.state = {
            isFollowing: false,
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
        console.log(state);
        //const currentUserId = this.props.item.userId
        const currentUserId = state.params.usuario;
        
        this.props.dispatch(amIFollowingUser(currentUserId)).then( isFollowing => this.setState({isFollowing}))
        .catch(e => console.log('error getting following status for user', e))

        this.props
        .dispatch(fetchUserProfile(currentUserId))
        .then(userSnap => {
            const user = userSnap.val()
            this.setState({
                initialValues:{
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    birthdate: user.birthdate,
                    userId: currentUserId
                }
            })
        })
    }


  

    render(){
        const {goBack} = this.props.navigation;
        console.log(this.state.isFollowing);
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
                             <Text style={styles.ageText} onPress={() => {
                            if(!this.state.isFollowing){
                                this.props.dispatch(followUser(this.state.initialValues.userId))
                                this.setState({isFollowing: true})
                            }else{
                                this.props.dispatch(unFollowUser(this.state.initialValues.userId))
                                this.setState({isFollowing: false})
                            }


                            }}>{this.state.isFollowing ? 'Unfollow' : ' Follow'} </Text>
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
import React from 'react'
import {
  StyleSheet,
  Text,
  View, Image
} from 'react-native'

const DEFAULT_AVATAR = 'https://flipagram.com/assets/resources/img/fg-avatar-anonymous-user-retina.png'
const AVATAR_SIZE = 32

const Comment = (props) => 

  <View style={styles.comment}>
   {
      props.userPhoto ?
        <Image style={styles.avatar} source={{ uri: props.userPhoto }} /> :
        <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} /> 
    }
    <Text style={styles.text}>{props.name}</Text>
    <Text style={styles.text}>{props.text}</Text>
  </View>

const styles = StyleSheet.create({
  comment: {
     backgroundColor: '#ecf0f1',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2
  }
})

export default Comment

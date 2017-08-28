// import React, { Component } from 'react';
// import { StyleSheet,Text,View, TouchableHighlight } from 'react-native';
// import styles from '@assets/styles/landing'


// /**
//   Example FBLoginView class
//   Please note:
//   - this is not meant to be a full example but highlights what you have access to
//   - If you use a touchable component, you will need to set the onPress event like below
// **/
// class FBLoginView extends Component {
//   static contextTypes = {
//     isLoggedIn: React.PropTypes.bool,
//     login: React.PropTypes.func,
//     logout: React.PropTypes.func,
//     props: React.PropTypes.object
// 	};

//   constructor(props) {
//       super(props);
//     }

//     render(){
//         return (

//            <TouchableHighlight  style={styles.fbButton} onPress={() => {
//                 if(!this.context.isLoggedIn){
//                   this.context.login()
//                 }else{
//                   this.context.logout()
//                 }

//               }}>
//                   <Text style={styles.buttonText}>Join with Facebook</Text>
//            </TouchableHighlight>

//       )
//     }
// }
// module.exports = FBLoginView;
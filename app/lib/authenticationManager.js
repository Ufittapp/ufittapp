import firebase from 'firebase'
import { firebaseConfigs } from '../config/secrets'

export default class AuthenticationManager{

  static init(){
    firebase.initializeApp(firebaseConfigs)
  }

  static isCurrentUserLoggedIn(){
      return !!firebase.auth().currentUser
  }

  addNewUser(userId, newUser){
    const user = Object.assign({}, newUser, { createdAt: firebase.ServerValue.TIMESTAMP})
    const publicUser = Object.assign({}, newUser, { userId })

    firebase.database()
      .ref('users')
      .child(userId)
      .set(user)
      .then(() => Promise.resolve(publicUser))
      .catch(e => console.log('error creating user', e))  
  }

  static createUserAccount(newUser){
    const { email, password, uid } = newUser

    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      //.then( user => this.addNewUser(uid, newUser))
      .catch(e => {
          console.log(e)
          return Promise.reject("Error creating new user account")
      })
  }

}
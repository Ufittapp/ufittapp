import firebase from 'firebase'
import { firebaseConfigs } from '../config/secrets'

export default class AuthenticationManager{

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
    return new Promise( (resolve, reject) => {
      const { email, password, uid } = newUser

      if(!email || !password) reject('Email and password are required fields')

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( user => resolve(user.toJSON()))
        .catch(e => {
          console.log(e)
          reject('Error creating new user account')
        })
    })
  }

}
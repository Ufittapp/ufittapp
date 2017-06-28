import firebase from 'firebase'
import { firebaseConfigs } from '../config/secrets'

export default class AuthenticationManager{

  static isCurrentUserLoggedIn(){
      return !!firebase.auth().currentUser
  }

  static addNewUser(userId, newUser){
    const user = Object.assign({}, newUser, { createdAt: firebase.database.ServerValue.TIMESTAMP, userId})
    const publicUser = Object.assign({}, newUser, { userId })

    return firebase.database()
      .ref('users')
      .child(userId)
      .set(user)
      .then(() => Promise.resolve(publicUser))
      .catch(e => {
        console.log('error inserting new user record', e)
        Promise.reject(e.message)
      })  
  }

  static createUserAccount(newUser){
    return new Promise( (resolve, reject) => {
      const { email, password } = newUser



      if(!email || !password) reject('Email and password are required fields')

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( user => this.addNewUser(user.uid, newUser) ) //.toJSON()
        .then( addedUser =>  resolve(addedUser))
        .catch(e => {
          console.log(JSON.stringify(e))
          reject(e.message)
        })
    })
  }

  static login(email, password){
    return new Promise ( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then( user => resolve(user.toJSON()))
        .catch(e => {
          console.log(e)
          reject(e.message)
        })
    })
  }

}
import firebase from 'firebase'
import { firebaseConfigs } from './secrets'

firebase.initializeApp(firebaseConfigs)
const database = firebase.database()

export const firebaseAuth = firebase.auth()

export const notificationTypes = {
    NEW_FOLLOWER: 'NEW_FOLLOWER'
}

export default db = {
   rootRef: database.ref(),
   usersRef: database.ref('users'),
   chatMessagesRef: database.ref('chatMessages'),
   followersRef: database.ref('followers'),
   followingsRef: database.ref('followings'),
   notificationsRef: database.ref('notifications'),
   videosRef: database.ref('videos')

}

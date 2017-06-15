import firebase from 'firebase'
import { firebaseConfigs } from './secrets'

firebase.initializeApp(firebaseConfigs)
const database = firebase.database()

export const firebaseAuth = firebase.auth()

export default db = {
   rootRef: database.ref(),
   usersRef: database.ref('users'),
   chatMessages: database.ref('chatMessages')
}

import db, { firebaseAuth } from '../config/database'
import _ from 'underscore'

export default class Api{
    static getUsers(){
        return db.usersRef.once('value').then(snap => {
            if(snap.exists()){
                const currentUserId = firebaseAuth.currentUser.uid
                return Promise.resolve(snap.val())
                
                /*snap.forEach( snapItem => {
                    
                })*/
            }else{
                return Promise.resolve({})
            }
        })
    }
}
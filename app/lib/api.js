import db, { firebaseAuth, notificationTypes } from '../config/database'
import _ from 'underscore'



export default class Api{

    static getUsers(){
        return db.usersRef.once('value').then(snap => {
            if(snap.exists()){
                const currentUserId = firebaseAuth.currentUser.uid
                return Promise.resolve(snap.val())
            }else{
                return Promise.resolve({})
            }
        })
    }

   

    static updateUserProfile(userId, fullName, phoneNumber, birthdate){
        return db.usersRef.child(userId).update({
            fullName,
            phoneNumber,
            birthdate
        })
    }

    static findUserById(userId){
        return db.usersRef.child(userId).once('value')
    }

    static unFollowUser(userId){
        if(!userId)
            return Promise.reject('User id is required param')
            
            const currentUser = firebaseAuth.currentUser
            let updates = {}

            updates[`followers/${userId}/${currentUser.uid}`] = null
            updates[`followings/${currentUser.uid}/${userId}`] = null

            return db.rootRef
                .update(updates)
                .then(() => Promise.resolve())
                .catch(e => Promise.reject(e))
    }

    static followUser(userId){
        if(!userId)
            return Promise.reject('User id is required param')

        return db.usersRef
            .child(userId)
            .once('value')
            .then( userSnap => {
                if(userSnap.exists()){
                    let updates = {}
                    const currentUser = firebaseAuth.currentUser

                    const newFollower = {
                        email: currentUser.email,
                        //userId: currentUser.uid,
                        username: currentUser.email.split('@')[0]
                    }

                    const newFollowing = {
                        email: userSnap.val().email,
                        //userId: userSnap.key,
                        username: userSnap.val().username
                    }

                    const newNotification = {
                        type: notificationTypes.NEW_FOLLOWER,
                        text: 'is following you now',
                        sender: {
                            userId: currentUser.uid,
                            username: currentUser.email.split('@')[0]
                        }
                    }

                    // TODO: increase followers count
                    //const newFollowerRef = db.followersRef.child(`followers/${userId}/list`).push()
                    //const newFollowingRef = db.followingsRef.child(`followings/${currentUser.uid}`).push()
                    const newNotificationRef = db.notificationsRef.child(`notifications/${userId}`).push()

                    updates[`followers/${userId}/${currentUser.uid}`] = newFollower
                    updates[`followings/${currentUser.uid}/${userId}`] = newFollowing
                    updates[`notifications/${userId}/${newNotificationRef.key}`] = newNotification

                    return db.rootRef
                        .update(updates)
                        .then(() => Promise.resolve())
                        .catch(e => Promise.reject(e))

                }else{
                    return Promise.reject('user id not found')
                }
            })
    }

    static amIFollowingUser(userId){
        if(!userId)
            return Promise.reject('User id is required param')

        const currentUser = firebaseAuth.currentUser

        return db.followingsRef
        .child(currentUser.uid)
        .child(userId)
        .once('value')
        .then( snap => Promise.resolve(snap.exists()) )
        .catch(e => Promise.reject(e))
    }

    static getNotifications(){
        const currentUser = firebaseAuth.currentUser

        return db
        .notificationsRef
        .child(currentUser.uid)
        .once('value')
        .then(snap => snap.exists() ? Promise.resolve(snap.val()) : Promise.resolve({}))
        .catch(e => Promise.reject(e))
    }
}
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
                        userId: currentUser.uid,
                        username: currentUser.email.split('@')[0]
                    }

                    const newFollowing = {
                        email: userSnap.val().email,
                        userId: userSnap.key,
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
                    const newFollowerRef = db.followersRef.child(`followers/${userId}/list`).push()
                    const newFollowingRef = db.followingsRef.child(`followings/${currentUser.uid}`).push()
                    const newNotificationRef = db.notificationsRef.child(`notifications/${userId}`).push()

                    updates[`followers/${userId}/${newFollowerRef.key}`] = newFollower
                    updates[`followings/${currentUser.uid}/${newFollowingRef.key}`] = newFollowing
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
}
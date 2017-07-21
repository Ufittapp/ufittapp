import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { Platform } from 'react-native'

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const imageFolderRef = firebase.storage().ref().child('profileImages')


class FirebaseImageManager{
    static getUserProfileImage(){
        const imageName = firebase.auth().currentUser.uid
        const ref = imageFolderRef.child(imageName)

        return ref.getDownloadURL()
    }

    static uploadImageToStorage(uri, mime = 'application/octet-stream'){
        return new Promise((resolve, reject) => {
            
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null

            const imageName = firebase.auth().currentUser.uid
            const imageRef = imageFolderRef.child(imageName)

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then(blob => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: 'image/jpeg' })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then(url => resolve(url))
                .catch(error=> reject(error))
            })
        }
    }

export default FirebaseImageManager
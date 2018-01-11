import * as firebase from 'firebase'
import { AccessToken } from 'react-native-fbsdk'

const config = {
  apiKey: 'AIzaSyC0Tpy9a7mJF8ZBTnQpxPDsb9J0SGZ2Rnw',
  authDomain: 'platzimusicreactnative.firebaseapp.com',
  databaseURL: 'https://platzimusicreactnative.firebaseio.com',
  storageBucket: 'platzimusicreactnative.appspot.com',
  messagingSenderId: '654043733386',
}

firebase.initializeApp(config)
export const firebaseAuth     = firebase.auth()
export const firebaseDatabase = firebase.database()
export default firebase

const { FacebookAuthProvider } = firebase.auth;

export const authenticateUser = () => {
  return new Promise((resolve, reject) => {
    AccessToken.getCurrentAccessToken().then(data => {
      if(data) {
        const credential = FacebookAuthProvider.credential(data.accessToken)
        firebaseAuth.signInWithCredential(credential).then(credentials => {
          resolve({success: true, credentials})
        }, (error) => resolve({ success: false, error }))
      }else
        resolve({ success: false })
    })
  })
}
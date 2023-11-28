import { getApps, getApp, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDTpHC3eTERinMj_Evz5UYZ2MlEaNrXt0s',
  authDomain: 'dropbox-clone-7e12b.firebaseapp.com',
  projectId: 'dropbox-clone-7e12b',
  storageBucket: 'dropbox-clone-7e12b.appspot.com',
  messagingSenderId: '930972296270',
  appId: '1:930972296270:web:c3f064292994e780f94f1f'
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }

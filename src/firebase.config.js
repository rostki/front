import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgqS8_weeGTIep0dTUSLg4sAib8hc0iEI",
  authDomain: "house-app-3b325.firebaseapp.com",
  projectId: "house-app-3b325",
  storageBucket: "house-app-3b325.appspot.com",
  messagingSenderId: "728762286812",
  appId: "1:728762286812:web:ac96f02fd16cb8fdbb2a19",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()

import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCG5NycYTwkyI9aaUni51VEmoHTeyN98C0",
  authDomain: "firetasks-74c52.firebaseapp.com",
  databaseURL: "https://firetasks-74c52.firebaseio.com",
  projectId: "firetasks-74c52",
  storageBucket: "firetasks-74c52.appspot.com",
  messagingSenderId: "994078493593",
  appId: "1:994078493593:web:58a9c7f930c7725d"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

// export firebase database

export default firebaseApp.firestore()
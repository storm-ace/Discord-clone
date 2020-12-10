import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpDxSJImaYHQTLOOhiRpBbKH7DBVkd1ck",
    authDomain: "discord-clone-45500.firebaseapp.com",
    databaseURL: "https://discord-clone-45500.firebaseio.com",
    projectId: "discord-clone-45500",
    storageBucket: "discord-clone-45500.appspot.com",
    messagingSenderId: "1019934686284",
    appId: "1:1019934686284:web:2411db1e94d8dd549748e9",
    measurementId: "G-QM9BECX788"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;
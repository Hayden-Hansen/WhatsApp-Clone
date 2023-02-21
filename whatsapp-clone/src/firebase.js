//import firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  /*YOUR FIREBASE CODE WILL GO HERE. I TOOK THIS OUT AS IT IS PRIVATE INFORMATION */
};



  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth,provider}
  
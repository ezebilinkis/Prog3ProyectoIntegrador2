import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCeH9unKRJOSwvYhLnLhTl66tNPe139Psk",
    authDomain: "almacenamientointegrador.firebaseapp.com",
    projectId: "almacenamientointegrador",
    storageBucket: "almacenamientointegrador.appspot.com",
    messagingSenderId: "991497650473",
    appId: "1:991497650473:web:683b3ec1d120ca937db738"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

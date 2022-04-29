import firebase from 'firebase';
require('dotenv').config();
 
const config = {
    apiKey: process.env.API_KEY,
    authDomain: "getting-started-99.firebaseapp.com",
    databaseURL: "https://getting-started-99.firebaseio.com",
    projectId: "getting-started-99",
    storageBucket: "getting-started-99.appspot.com",
    messagingSenderId: "493112502254",
    appId: "1:493112502254:web:28a214038e1719d9b250ff",
    measurementId: "G-P71JKMV3N5"
};
 
firebase.initializeApp(config);
// console.log('DONE');

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
.then(() => {
    
})
.catch(() => {
    console.log('Persistence Error');
})

export default firebase;
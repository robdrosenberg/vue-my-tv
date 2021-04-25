import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBclslv87TH3E2ieJFdPQwwJxN2QFb6pvw",
  authDomain: "vue-my-tv.firebaseapp.com",
  projectId: "vue-my-tv",
  storageBucket: "vue-my-tv.appspot.com",
  messagingSenderId: "572715034229",
  appId: "1:572715034229:web:c5f642d225e14f31e0fa3c"
};

export default firebase.initializeApp(firebaseConfig);
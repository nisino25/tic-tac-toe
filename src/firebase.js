import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyDPqjteOoeqlOZ2MmaxLB4mXSCFDveWiJs",
  authDomain: "tic-tac-toe-e1e64.firebaseapp.com",
  projectId: "tic-tac-toe-e1e64",
  storageBucket: "tic-tac-toe-e1e64.appspot.com",
  messagingSenderId: "279877802711",
  appId: "1:279877802711:web:4b65e2a4d3763e8d9f2e92",
  measurementId: "G-82J53LFCJC"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
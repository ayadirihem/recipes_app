import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import 'firebase/storage'
const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBDZeKpsd7j3jB-8VLLirq0R0nc-tn1638",
  authDomain: "recipeapi-c5d79.firebaseapp.com",
  databaseURL: "https://recipeapi-c5d79.firebaseio.com",
  projectId: "recipeapi-c5d79",
  storageBucket: "recipeapi-c5d79.appspot.com",
  messagingSenderId: "531795747964",
  appId: "1:531795747964:web:4d4f4f30508508636915f9",
  measurementId: "G-Z0S9TYQFF2"
};
firebase.initializeApp(config);
firebase.analytics();
const storage = firebase.storage()

export default {storage,firebase};
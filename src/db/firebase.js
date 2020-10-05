import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyAIedO3gqktDcZo6mCWxnkg2xWhVTcjwq0",
  authDomain: "api-sedd.firebaseapp.com",
  databaseURL: "https://api-sedd.firebaseio.com",
  projectId: "api-sedd",
  storageBucket: "",
  messagingSenderId: "832045499740",
  appId: "1:832045499740:web:95e84aa9ed1409ec"
};

let init = firebase.initializeApp(config);

export default init;

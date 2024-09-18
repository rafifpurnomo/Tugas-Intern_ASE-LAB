// Import the functions you need from the SDKs you need
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwh_OR0CPtmR5R4CDRYrz8YEbomyofg-0",
  authDomain: "be-pengajuanktm.firebaseapp.com",
  projectId: "be-pengajuanktm",
  storageBucket: "be-pengajuanktm.appspot.com",
  messagingSenderId: "608981420260",
  appId: "1:608981420260:web:b022658730a5ef4da604f1",
  measurementId: "G-7X63G01L1P",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage, ref, uploadBytes, getDownloadURL };

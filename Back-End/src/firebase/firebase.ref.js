// firebaseConfig.js
const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");

// Load your service account key JSON file (generated from Firebase Console)
const serviceAccount = require("path/to/serviceAccountKey.json");

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "be-pengajuanktm.appspot.com", // Replace with your Firebase storage bucket name
});

// Get a reference to the storage service
const storage = getStorage();
const bucket = storage.bucket();

module.exports = { bucket, storage };

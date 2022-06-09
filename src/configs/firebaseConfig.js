/* eslint-disable no-console */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  deleteDoc,
} from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyBSjfCRBi1pMDKFYWR5bbF9QEjZmW3QUQg',
  authDomain: 'songify-72495.firebaseapp.com',
  projectId: 'songify-72495',
  storageBucket: 'songify-72495.appspot.com',
  messagingSenderId: '991434183077',
  appId: '1:991434183077:web:34319aa14a13e428aad84c',
  measurementId: 'G-CH1XT3GVJM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

const auth = getAuth();

const songsColRef = collection(db, 'songs');

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};

export const createSong = (user, title, lyric) => addDoc(songsColRef, {
  created: serverTimestamp(),
  createdBy: user || null,
  title,
  lyric,
});

export const getSongs = () => {
  const q = query(collection(db, 'songs'), orderBy('created', 'desc'));

  onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    console.log(data);
  });
};

export const handleDelete = async (id) => {
  const taskDocRef = doc(songsColRef, id);
  try {
    await deleteDoc(taskDocRef);
  } catch (err) {
    alert(err);
  }
};

export const onSaveSongClicked = async (user, title, lyric) => {
  try {
    await addDoc(songsColRef, {
      date: serverTimestamp(),
      createdBy: user,
      title,
      lyric,
    });
  } catch (err) {
    alert(err);
  }
};

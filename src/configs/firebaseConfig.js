// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
    arrayUnion
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBSjfCRBi1pMDKFYWR5bbF9QEjZmW3QUQg",
  authDomain: "songify-72495.firebaseapp.com",
  projectId: "songify-72495",
  storageBucket: "songify-72495.appspot.com",
  messagingSenderId: "991434183077",
  appId: "1:991434183077:web:34319aa14a13e428aad84c",
  measurementId: "G-CH1XT3GVJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

const songsColRef = collection(db, 'songs')

export const createSong = (user, title, lyric) => {
    return addDoc(songsColRef, {
            created: serverTimestamp(),
            createdBy: user,
            title,
            lyric
        });
};

export const getSongs = () => {
    const itemsQuery = query(songsColRef, orderBy('created'))

    return onSnapshot(itemsQuery);

};

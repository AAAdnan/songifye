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
    arrayUnion,
    deleteDoc
} from "firebase/firestore";

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
    } from 'firebase/auth';


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

const auth = getAuth();


const songsColRef = collection(db, 'songs')

export {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
    }

export const createSong = (user, title, lyric) => {
    return addDoc(songsColRef, {
            created: serverTimestamp(),
            createdBy: user,
            title,
            lyric
        });
};

export const getSongs = () => {  

    const q = query(collection(db, 'songs'), orderBy('created', 'desc'))
    
    onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
        }))

    console.log(data);

    })
}

export const handleDelete = async (id) => {

    const taskDocRef = doc(songsColRef, id)
    try {
        await deleteDoc(taskDocRef)
    } catch (err) {
        alert(err)
    }
}

export const onSaveSongClicked = async (user, title, lyric) => {
    try {
        await addDoc(songsColRef, {
        date: serverTimestamp(),
        createdBy: user,
        title: title,
        lyric: lyric
        })
    } catch(err) {
        alert(err)
    }
}

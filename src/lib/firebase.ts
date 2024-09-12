// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
//     measurementId: import.meta.env.VITE_measurementId,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyCs7a2QrmMrR0rYH3ltuOONGEes2OjVZ1A',
  authDomain: 'ifaz-vue-project.firebaseapp.com',
  projectId: 'ifaz-vue-project',
  storageBucket: 'ifaz-vue-project.appspot.com',
  messagingSenderId: '733327873071',
  appId: '1:733327873071:web:2375af3c2641e9061fe2da',
  measurementId: 'G-REMKK6M7SC'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const auth = getAuth(app)

export default app

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
}

export const signInWithGithub = () => {
  return signInWithPopup(auth, githubProvider)
}

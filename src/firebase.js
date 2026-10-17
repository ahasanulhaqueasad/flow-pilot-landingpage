
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCbyQhlXTsCCVW4hMgaINVXjxbWoAfFgjs",
    authDomain: "flow-pilot-landingpage.firebaseapp.com",
    projectId: "flow-pilot-landingpage",
    storageBucket: "flow-pilot-landingpage.firebasestorage.app",
    messagingSenderId: "385124902996",
    appId: "1:385124902996:web:3b0f9967ad622bf9ece5c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
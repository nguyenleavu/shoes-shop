import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
    apiKey: 'AIzaSyBS4WgbeSOKOx6WzIr1E2TLs53ok2l7hW0',
    authDomain: 'shoes-shop-b8ebd.firebaseapp.com',
    projectId: 'shoes-shop-b8ebd',
    storageBucket: 'shoes-shop-b8ebd.appspot.com',
    messagingSenderId: '85290001433',
    appId: '1:85290001433:web:25d60f0c3f0c1671097688',
    measurementId: 'G-Z5QDTMBKCG',
};

const app = initializeApp(config);
export const auth: any = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

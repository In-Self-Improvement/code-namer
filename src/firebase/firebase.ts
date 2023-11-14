// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, getFirestore } from 'firebase/firestore';
import { getAuth, getIdToken } from 'firebase/auth';
import axios from 'axios';
import Cookies from 'js-cookie';
import { collection } from 'firebase/firestore';
import { addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '~/hooks/useAuth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const firebaseAPI = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_BASEURL,
});

// 요청을 보내기 전에 토큰을 헤더에 추가하는 인터셉터
firebaseAPI.interceptors.request.use(
  async (config) => {
    if (auth.currentUser) {
      const token = await getIdToken(auth.currentUser);
      Cookies.set('auth_token', token, { expires: 7, path: '/' });
      config.headers.Authorization = `Bearer ${token}`;
      console.log('token', token);
    } else if (Cookies.get('auth_token')) {
      config.headers.Authorization = `Bearer ${Cookies.get('auth_token')}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// const getAuthState = () => {
//   const [user, loading, error] = useAuthState(auth);
// };

const recommendNameCollection = collection(db, 'RecommendedNames');
const userCollection = (email: string) => {
  return doc(db, 'users', email);
};
const addRecommendNameToUserCollection = (email: string, docRefId: string) => {
  updateDoc(userCollection(email), {
    RecommendName: arrayUnion(docRefId),
  });
};

const saveRecommendName = (recommendNameData) => {
  const user = 'test@gmail.com';
  addDoc(recommendNameCollection, recommendNameData).then((docRef) => {
    addRecommendNameToUserCollection(user, docRef.id);
  });
};

export default firebaseAPI;

export {
  db,
  auth,
  app,
  recommendNameCollection,
  addRecommendNameToUserCollection,
  saveRecommendName,
};

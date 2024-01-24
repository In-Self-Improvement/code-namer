// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, getFirestore } from 'firebase/firestore';
import { getAuth, getIdToken } from 'firebase/auth';
import axios from 'axios';
import Cookies from 'js-cookie';
import { collection } from 'firebase/firestore';
import {
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
} from 'firebase/firestore';
import { toastErrorMessage, toastSuccessMessage } from '~/utils/toastMessage';

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
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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

const saveOrUpdateUser = async (email: string, userData) => {
  if (!email) {
    toastErrorMessage('로그인에 실패하였습니다');
    return;
  }
  const userDocRef = userCollection(email);
  const docSnap = await getDoc(userDocRef);
  const { lastUpdated } = userData;

  if (docSnap.exists()) {
    // 문서가 이미 존재하므로, 문서를 업데이트합니다.
    updateDoc(userCollection(email), { lastUpdated })
      .then(() => {
        toastSuccessMessage('로그인되었습니다.');
      })
      .catch((error) => {
        toastErrorMessage('로그인에 실패하였습니다');
      });
  } else {
    // 문서가 존재하지 않으므로, 새 문서를 추가합니다.
    setDoc(doc(db, 'users', email), userData)
      .then((docRef) => {
        toastSuccessMessage('로그인되었습니다.');
      })
      .catch((error) => {
        toastErrorMessage('로그인에 실패하였습니다');
      });
  }
};
const addRecommendNameToUserCollection = (email: string, docRefId: string) => {
  updateDoc(userCollection(email), {
    RecommendName: arrayUnion(docRefId),
  });
};

const saveRecommendName = (email: string, recommendNameData) => {
  addDoc(recommendNameCollection, recommendNameData).then((docRef) => {
    addRecommendNameToUserCollection(email, docRef.id);

    window.location.href = '/result?recommendid=' + docRef.id;
  });
};

const updateRecommendName = async (
  docId: string,
  recommendNameList: string[]
) => {
  const recommendNameRef = doc(recommendNameCollection, docId);

  await updateDoc(recommendNameRef, {
    lastUpdated: Date.now(),
    recommendName: recommendNameList,
  });

  return { recommendName: recommendNameList };
};

const updateRecommendNameOptions = async (docId: string, options: string[]) => {
  const recommendNameRef = doc(recommendNameCollection, docId);

  await updateDoc(recommendNameRef, {
    lastUpdated: Date.now(),
    options,
  });

  return options;
};

const getRecommendOptions = async (recommendId: string) => {
  const recommendNameRef = doc(recommendNameCollection, recommendId);
  const recommendNameDoc = await getDoc(recommendNameRef);
  if (recommendNameDoc.exists()) {
    const dataWithRecommendId = recommendNameDoc.data();
    const currentOptions = dataWithRecommendId?.options;
    return { options: currentOptions };
  }
};

const getRecommendNameList = async (recommendId: string) => {
  const recommendNameRef = doc(recommendNameCollection, recommendId);
  const recommendNameDoc = await getDoc(recommendNameRef);
  if (recommendNameDoc.exists()) {
    const dataWithRecommendId = recommendNameDoc.data();
    const currentRecommendName = dataWithRecommendId?.recommendName;
    return { recommendName: currentRecommendName };
  }
};

const getType = async (recommendId: string) => {
  const recommendNameRef = doc(recommendNameCollection, recommendId);
  const recommendNameDoc = await getDoc(recommendNameRef);
  if (recommendNameDoc.exists()) {
    const dataWithRecommendId = recommendNameDoc.data();
    const currentType = dataWithRecommendId?.type;
    return { type: currentType };
  }
};

const getDesc = async (recommendId: string) => {
  const recommendNameRef = doc(recommendNameCollection, recommendId);
  const recommendNameDoc = await getDoc(recommendNameRef);
  if (recommendNameDoc.exists()) {
    const dataWithRecommendId = recommendNameDoc.data();
    const currentDesc = dataWithRecommendId?.desc;
    return { desc: currentDesc };
  }
};

const getRecommendNamesFromUser = async (email: string) => {
  const userDocRef = userCollection(email);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data().RecommendName;
  } else {
    //TODO데이터 없음 예외처리
  }
};

const getRecommendNameData = async (recommendNames: string[]) => {
  const recommendNameData = [];

  for (const name of recommendNames) {
    const recommendNameDocRef = doc(recommendNameCollection, name);
    const recommendNameDoc = await getDoc(recommendNameDocRef);
    if (recommendNameDoc.exists()) {
      const dataWithRecommendId = Object.assign({}, recommendNameDoc.data(), {
        recommendId: name,
      });
      recommendNameData.push(dataWithRecommendId);
    } else {
      // TODO 데이터 없음 예외처리
    }
  }

  return recommendNameData;
};

const getRecommendNameDataForUser = async (email: string) => {
  const recommendNames = await getRecommendNamesFromUser(email);
  const recommendNameData = await getRecommendNameData(recommendNames);
  return recommendNameData;
};

export default firebaseAPI;

export {
  db,
  auth,
  app,
  recommendNameCollection,
  addRecommendNameToUserCollection,
  saveRecommendName,
  getRecommendNameDataForUser,
  updateRecommendName,
  saveOrUpdateUser,
  updateRecommendNameOptions,
  getRecommendOptions,
  getRecommendNameList,
  getType,
  getDesc,
};

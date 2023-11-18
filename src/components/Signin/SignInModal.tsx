import React, { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  GithubAuthProvider,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import firebaseAPI, { auth, saveOrUpdateUser } from '~/firebase/firebase';

import { SET_LOADING } from '~/redux/slice/loadingSlice';
import './SignInModal.css';
const SignInModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const saveTokenId = async () => {
    const currentUserTokenId = await auth.currentUser.getIdToken();
    Cookies.set('auth_token', currentUserTokenId, { expires: 7, path: '/' });
  };

  const updateUserDB = (user) => {
    const uid = user.uid;
    const displayName = user.displayName;
    const userEmail = user.email;

    const userData = {
      uid,
      userName: displayName,
      createAt: Date.now(),
      lastUpdated: Date.now(),
      status: 'active',
    };
    saveOrUpdateUser(userEmail, userData);
  };

  const signInSuccess = async (docRef) => {
    dispatch(SET_LOADING(false));
    saveTokenId();
    updateUserDB(docRef.user);
    onRequestClose();
  };

  const signInError = (error: string) => {
    alert(error);
    // TODO: 사용자에게 에러 메시지 표시
    dispatch(SET_LOADING(false));
  };
  const signInWithGoogle = () => {
    dispatch(SET_LOADING(true));

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(signInSuccess).catch(signInError);
  };

  const signInWithGithub = () => {
    dispatch(SET_LOADING(true));
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then(signInSuccess).catch(signInError);
  };

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(SET_LOADING(true));
    signInWithEmailAndPassword(auth, email, password)
      .then(signInSuccess)
      .catch(signInError);
  };

  return (
    <section className="section">
      <Modal
        onClick={(e) => e.stopPropagation()}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        shouldCloseOnOverlayClick
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          },
        }}
        className="modal-content"
      >
        <form onSubmit={signInWithEmail} className="form">
          <header className="login_title">Code Namer</header>
          <p className="login_subtitle">
            계정에 로그인 후 <br />
            <strong>무제한 무료로</strong>
            이용해보세요.
          </p>

          <div className="login_button_container">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="google_login_button"
            >
              구글 계정으로 로그인
            </button>
            <button
              type="button"
              onClick={signInWithGithub}
              className="github_login_button"
            >
              Github 계정으로 로그인
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default SignInModal;

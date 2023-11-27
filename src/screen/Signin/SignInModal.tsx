import React from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { auth, saveOrUpdateUser } from '~/firebase/firebase';

import { SET_LOADING } from '~/redux/slice/loadingSlice';
import './SignInModal.css';
import { toastErrorMessage } from '~/utils/toastMessage';
const SignInModal = ({ isOpen, onRequestClose }) => {
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

  const signInError = (fromUrl: string, error: string) => {
    if (fromUrl === 'github') {
      toastErrorMessage(
        '이미 구글 계정으로 가입된 이메일입니다. 구글 로그인을 이용해주세요.'
      );
    } else if (fromUrl === 'google') {
      toastErrorMessage(
        '이미 깃허브 계정으로 가입된 이메일입니다. 깃허브 로그인을 이용해주세요.'
      );
    }
    // TODO: 사용자에게 에러 메시지 표시
    dispatch(SET_LOADING(false));
  };
  const signInWithGoogle = () => {
    dispatch(SET_LOADING(true));

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(signInSuccess)
      .catch(signInError.bind(this, 'google'));
  };

  const signInWithGithub = () => {
    dispatch(SET_LOADING(true));
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(signInSuccess)
      .catch(signInError.bind(this, 'github'));
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
        <form className="form">
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

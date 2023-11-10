import React, { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import firebaseAPI, { auth } from '~/firebase/firebase';

import { SET_LOADING } from '~/redux/slice/loadingSlice';
import './SignInModal.css';
const SignInModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const saveTokenId = async (tokenId) => {
    Cookies.set('auth_token', tokenId, { expires: 7, path: '/' });
  };

  const signInSuccess = async () => {
    dispatch(SET_LOADING(false));
    const currentUserTokenId = await auth.currentUser.getIdToken();
    saveTokenId(currentUserTokenId);
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

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(SET_LOADING(true));
    signInWithEmailAndPassword(auth, email, password)
      .then(signInSuccess)
      .catch(signInError);
  };

  const getData = async () => {
    const response = await firebaseAPI.get('/test');
    if (response.status === 200) {
      console.log('response.data.documents', response.data.documents);
    } else {
      console.error('Failed to fetch documents:', response.statusText);
      return null;
    }
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
            border: 'none',
          },
        }}
        className="modal-content"
      >
        <form onSubmit={signInWithEmail} className="form">
          <h1 className="h1">로그인</h1>
          <div className="mb-4">
            <label htmlFor="email" className="label">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하시오"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="label">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하시오"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <button type="submit" className="button">
              로그인
            </button>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="button-google"
            >
              구글 계정으로 로그인
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default SignInModal;

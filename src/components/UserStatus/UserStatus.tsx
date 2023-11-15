import React, { useState } from 'react';
import './UserStatus.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import SignInButton from '~/components/UserStatus/SignInButton/SignInButton';
import SignOutButton from '~/components/UserStatus/SignOutButton/SignOutButton';

import { SET_LOADING } from '~/redux/slice/loadingSlice';
import SignInModal from '~/components/Signin/SignInModal';
import { useAuth } from '~/hooks/useAuth';
import { auth } from '~/firebase/firebase';
const UserStatus = () => {
  const { user, loading, error } = useAuth();
  const dispatch = useDispatch();
  const displayName = user ? user.displayName : '로그인';
  const [clickSignOut, setClickSignOut] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const clickSignInButton = () => {
    if (user) {
      setClickSignOut(!clickSignOut);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const signout = () => {
    dispatch(SET_LOADING(true));
    signOut(auth)
      .then(() => {
        // toast.success("로그아웃 되었습니다.");
        dispatch(SET_LOADING(false));
        clickSignInButton();
      })
      .catch((e) => {
        // toast.error(error.message);
      });
  };

  return (
    <div className="userStatus_container">
      <SignInButton displayName={displayName} onClick={clickSignInButton} />
      {clickSignOut && <SignOutButton onClick={signout} />}
      <SignInModal
        isOpen={isSignInModalOpen}
        onRequestClose={closeSignInModal}
      />
    </div>
  );
};

export default UserStatus;

import React, { useState } from "react";
import "./UserStatus.css";
import SignInButton from "~/components/signin/SignInButton/SignInButton";
import SignOutButton from "~/components/signin/SignOutButton/SignOutButton";

import { auth } from "~/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_LOADING } from "~/redux/slice/loadingSlice";

const UserStatus = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const displayName = user ? user.displayName : null;
  const [clickSignOut, setClickSignOut] = useState(false);

  const clickSignInButton = () => {
    if (user) {
      setClickSignOut(!clickSignOut);
    } else {
      signin();
    }
  };

  const signin = () => {
    // signin 팝업 열기
    console.log("signin");
  };

  const signout = () => {
    dispatch(SET_LOADING(true));
    signOut(auth)
      .then(() => {
        // toast.success("로그아웃 되었습니다.");
        dispatch(SET_LOADING(false));
        clickSignInButton();
      })
      .catch((error) => {
        // toast.error(error.message);
      });
  };

  return (
    <div className="userStatus_container">
      <SignInButton displayName={displayName} onClick={clickSignInButton} />
      {clickSignOut && <SignOutButton onClick={signout} />}
    </div>
  );
};

export default UserStatus;

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '~/firebase/firebase';
import { SET_ACTIVE_USER } from '~/redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// const dispatch = useDispatch();
// export const useAuth = () => {
//   const [user, loading, error] = useAuthState(auth);

//   return { user, loading, error };
// };

export const useAuth = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      dispatch(SET_ACTIVE_USER(user));
    }
  }, [user, dispatch]);

  return { user, loading, error };
};

export const saveAuthStatus = (user) => {
  // dispatch(SET_ACTIVE_USER(user));
};

export const useCheckSignin = () => {
  const { user } = useAuth();
  return !!user;
};

import React from 'react';
import './SignOutButton.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '~/components/Button/Button';

const SignOutButton = (props) => {
  const { onClick } = props;

  return (
    <div className="signout_container">
      <Button onClick={onClick}>
        <LogoutIcon />
        로그아웃
      </Button>
    </div>
  );
};

export default SignOutButton;

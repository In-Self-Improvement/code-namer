import React from 'react';
import './SignInButton.css';
import PersonIcon from '@mui/icons-material/Person';
import Button from '~/components/Button/Button';

const SignInButton = (props) => {
  const { displayName, onClick } = props;

  return (
    <div className="signin_container">
      <Button
        buttonStyle={{ textAlign: displayName ? 'start' : 'center' }}
        onClick={onClick}
      >
        {displayName && <PersonIcon style={{ marginRight: '20px' }} />}
        {displayName || '로그인'}
      </Button>
    </div>
  );
};

export default SignInButton;

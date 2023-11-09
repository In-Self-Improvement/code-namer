import React from "react";
import "./SignOutButton.css";
import Button from "~/components/Button/Button";
import LogoutIcon from "@mui/icons-material/Logout";

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

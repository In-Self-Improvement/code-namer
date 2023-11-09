import React from "react";
import "./SignInButton.css";
import Button from "~/components/Button/Button";
import PersonIcon from "@mui/icons-material/Person";

const SignInButton = (props) => {
  const { displayName, onClick } = props;

  return (
    <div className="signin_container">
      <Button
        buttonStyle={{ textAlign: displayName ? "start" : "center" }}
        onClick={onClick}
      >
        {displayName && <PersonIcon style={{ marginRight: "20px" }} />}
        {displayName ? displayName : "로그인"}
      </Button>
    </div>
  );
};

export default SignInButton;

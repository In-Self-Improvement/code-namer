import React from "react";
import "./Button.css";

const Button = (props) => {
  const { containerStyle, buttonStyle, onClick, children } = props;
  return (
    <div style={containerStyle}>
      <button className="button" style={buttonStyle} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;

import React from "react";
import "./styles.css";

function Button({ text, onClick, blue }) {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;

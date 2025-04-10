import React from "react";
import Header from "../components/Header";
import SignupSigninComponent from "../components/SignupSignin";
import About from "../components/About";

function Signup() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignupSigninComponent />
      </div>
    </div>
  );
}

export default Signup;

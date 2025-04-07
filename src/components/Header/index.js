import React, { use, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logout successful");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Tosh-Fi</p>
      {user ? (
        <p onClick={logoutFnc} className="logo link">
          Logout
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;

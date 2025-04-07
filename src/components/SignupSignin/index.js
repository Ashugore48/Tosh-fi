import React, { useState } from "react";
import "./styles.css";
import Input from "../input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, doc, provider, setDoc } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    console.log("Signup with email:", {
      name,
      email,
      password,
      confirmPassword,
    });
    // signup logic here
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        console.log("Signup successful");
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User created:", user);
            toast.success("User created successfully");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/dashboard");
            createDoc(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            // ..
          });
      } else {
        console.log("Passwords do not match");
        toast.error("Passwords do not match", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      console.log("Please fill all the fields");
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  function LoginWithEmail() {
    console.log("Login with email:", { email, password });

    // login logic here
    if (email !== "" && password !== "") {
      console.log("Login successful");
      // create doc logic here
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User logged in:", user);
          toast.success("Login successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      console.log("Please fill all the fields");
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          // Set the document's data
          name: user.displayName ? user.displayName : name,
          // Use the display name if available, otherwise use the name from the form
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : null,
          // Use the photo URL if available, otherwise set it to null
          createdAt: new Date(),
          // Set the createdAt field to the current date
        });
        toast.success("User document created successfully");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("User document already exists");
    }
  }

  function googleAuth() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("User logged in:", user);
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        createDoc(user);
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Log in on <span className="blue-title">Tosh-Fi.</span>
          </h2>
          <form>
            <Input
              lable="Email"
              type={"email"}
              placeholder="Bajirao@gmail.com"
              state={email}
              setState={setEmail}
            />

            <Input
              lable="password"
              type={"password"}
              placeholder="Example@123"
              state={password}
              setState={setPassword}
            />

            <Button
              text={"Login using Email and Password"}
              onClick={LoginWithEmail}
            />
            <p className="or">OR</p>
            <Button
              text={"Login using Google"}
              blue={true}
              onClick={googleAuth}
            />

            <p
              className="or"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't have an account? Click here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span className="blue-title">Tosh-Fi.</span>
          </h2>
          <form>
            <Input
              lable="Full Name"
              placeholder="Bajirao Singham"
              state={name}
              setState={setName}
            />

            <Input
              lable="Email"
              type={"email"}
              placeholder="Bajirao@gmail.com"
              state={email}
              setState={setEmail}
            />

            <Input
              lable="password"
              type={"password"}
              placeholder="Example@123"
              state={password}
              setState={setPassword}
            />

            <Input
              lable="Confirm Password"
              type={"password"}
              placeholder="Example@123"
              state={confirmPassword}
              setState={setConfirmPassword}
            />
            <Button
              text={"Signup using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="or">OR</p>
            <Button
              text={"Signup using Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p
              className="or"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't have an account? Click here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;

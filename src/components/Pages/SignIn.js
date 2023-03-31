import React, { useContext } from "react";
import { useRef } from "react";
import { useHistory,Link } from "react-router-dom";
import LoginContext from "../Context/LoginContext";
import classes from "./SignIn.module.css";
import Form from "../Layout/UI/Form";
const SignIn = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");

  const history = useHistory("");

  const loginCtx = useContext(LoginContext);

  const signInSubmitHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB1MT0G7F1tJ6fr81fLMNyQfJMMc88rE8",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: pswdValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data.email);

      emailRef.current.value = "";
      pswdRef.current.value = "";

      loginCtx.login(data.email, data.idToken);

      history.replace("/welcome");
    } else {
      alert(data.error.message);
    }
  };
  return (
    <Form onSubmit={signInSubmitHandler} className={classes.signIn}>
    <div>
      <h3>Sign In</h3>
    </div>
    <div>
      <input
        id="emailId"
        placeholder="Email"
        type="text"
        ref={emailRef}
      ></input>
      <input
        id="passwordId"
        placeholder="Password"
        type="password"
        ref={pswdRef}
      />
    </div>
    <button>Sign In</button>
    <Link to="/forgotPassword">Forgot Password?</Link>
  </Form>
);
};
export default SignIn;
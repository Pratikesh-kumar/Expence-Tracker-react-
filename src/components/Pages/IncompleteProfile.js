import classes from "./IncompleteProfile.module.css";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import LoginContext from "../Context/LoginContext";
import Form from "../Layout/UI/Form";

const IncompleteProfile = () => {
  const [displayNameValue, setDisplayNameValue] = useState("");
  const [photoUrlValue, setPhotoUrlValue] = useState("");
  const fullNameRef = useRef("");
  const photoRef = useRef("");

  const loginCtx = useContext(LoginContext);

  const updateDetailsHandler = async (event) => {
    event.preventDefault();

    const fullName = fullNameRef.current.value;
    const photoUrl = photoRef.current.value;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDB1MT0G7F1tJ6fr81fLMNyQfJMMc88rE8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: loginCtx.idToken,
          displayName: fullName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data);

      fullNameRef.current.value = "";
      photoRef.current.value = "";
    } else {
      alert(data.error.message);
    }
  };
  useEffect(() => {
    const fillInputsHandler = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDB1MT0G7F1tJ6fr81fLMNyQfJMMc88rE8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: loginCtx.idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const data = await response.json();
      if (response.ok) {
        setDisplayNameValue(data.users[0].displayName);
        setPhotoUrlValue(data.users[0].photoUrl);
      } else {
        alert(data.error.message);
      }
    };
    fillInputsHandler();
  }, []);

  return (
    <React.Fragment>
         <div className={classes.mainProfile}>
        <span className={classes.welcome}>
          Winners never quit, Quitters never win...!!!
        </span>
        <span className={classes.profile}>
          <span>
            Your profile is <b>64%</b> completed. A complete profile has a
            higher chance of landing a job.
          </span>
        </span>
      </div>
      <Form className={classes.form} onSubmit={updateDetailsHandler}>
        <div className={classes.formHead}>
          <span>Contact Details</span>
          <button>Cancel</button>
        </div>
        <div className={classes.formBody}>
          <label>Full Name:</label>
          <input
            type="text"
            ref={fullNameRef}
            defaultValue={displayNameValue}
          />
          <label>Profile Photo URL:</label>
          <input type="text" ref={photoRef} defaultValue={photoUrlValue} />
          <div className={classes.button}>
            <button type="submit">Update</button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default IncompleteProfile;

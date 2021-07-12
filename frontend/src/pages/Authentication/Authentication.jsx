import React from "react";
import GeneralForm from "../../components/Authentication/GeneralForm";
import styles from "./auth.module.css";
import { Link } from "react-router-dom";

const loginFields = {
  username: { name: "username", type: "text", label: "Username" },
  password: { name: "password", type: "password", label: "Password" },
};

const registerFields = {
  username: { name: "username", type: "text", label: "Username" },
  password: { name: "password", type: "password", label: "Password" },
};

const Authentication = (props) => {
  const auth_type = props.history.location.pathname.slice(1);
  const loginSubmitHandler = (data) => {
    console.log(data);
  };

  const registerSubmitHandler = () => {};

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1>{auth_type === "login" ? "Login" : "Register"}</h1>
        {auth_type === "login" ? (
          <GeneralForm
            fields={loginFields}
            submitHandler={loginSubmitHandler}
          />
        ) : (
          <GeneralForm
            fields={registerFields}
            submitHandler={registerSubmitHandler}
          />
        )}
        {auth_type === "login" ? (
          <p>
            Not Registered? <Link to="/register">Sign Up</Link>
          </p>
        ) : (
          <p>
            Already Registered? <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Authentication;

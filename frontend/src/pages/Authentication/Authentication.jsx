import React from "react";
import GeneralForm from "../../components/Authentication/GeneralForm";
import styles from "./auth.module.css";
import { Link } from "react-router-dom";
import { LoginHandler, RegisterHandler } from "../../utils/authUtils";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const loginFields = {
  username: { name: "username", type: "text", label: "Username" },
  password: { name: "password", type: "password", label: "Password" },
};

const registerFields = {
  name: { name: "name", type: "text", label: "Name" },
  username: { name: "username", type: "text", label: "Username" },
  password: { name: "password", type: "password", label: "Password" },
  dept: { name: "dept", type: "text", label: "Department" },
  yop: { name: "yop", type: "number", label: "Year of Admission" },
};

const Authentication = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth_type = props.history.location.pathname.slice(1);
  const loginSubmitHandler = async (data) => {
    try {
      await LoginHandler(data);
      dispatch({ type: "INIT.USER" });

      history.go("/");
    } catch (err) {
      console.log(err);
    }
  };

  const registerSubmitHandler = async (data) => {
    try {
      console.log(data);
      const res = await RegisterHandler(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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

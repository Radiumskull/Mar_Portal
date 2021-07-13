import axios from "axios";
import jwt from "jwt-decode";

export const LoginHandler = async (data) => {
  try {
    console.log(data);
    const res = await axios.post("http://127.0.0.1:8000/auth/login", data);
    const resData = res.data;
    if (data.Data === null) {
      throw new Error("User does not exist");
    }
    const user = jwt(res.data.Data.Token);
    localStorage.setItem("token", resData.Data.Token);
    localStorage.setItem("username", user.data.username);
    localStorage.setItem("userid", user.data.userid);
  } catch (err) {
    console.log(err);
    throw new Error("Some Problem Occured");
  }
};

export const RegisterHandler = async (data) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/register", data);
    if (res.data.Err) {
      throw new Error("User already exists");
    }
    console.log(res.data);
  } catch (err) {
    console.log(err);
    throw new Error("Some Problem Occured");
  }
};

export const fetchLocalUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = jwt(token);
    const obj = user.data;
    obj["token"] = token;
    return obj;
  } else {
    return null;
  }
};

export const fetchUserByUsername = async (token, user) => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/user/username/" + user, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
  } catch (err) {
    throw err;
  }
};

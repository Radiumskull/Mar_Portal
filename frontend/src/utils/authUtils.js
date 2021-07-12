import axios from "axios";

export const LoginHandler = async (data) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/login", {
      username: "aritra1",
      password: "12345",
    });

    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

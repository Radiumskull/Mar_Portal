import axios from "axios";

export const getUserData = async (user) => {
  console.log("GETTING USER");
  try {
    const res = await axios.get("http://127.0.0.1:8000/user", {
      headers: {
        Authorization: user.token,
      },
    });

    console.log(res)
    return res.data.Data;
  } catch (err) {
    throw err;
  }
};
export const getActivities = async (user) => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/user/activities", {
      headers: {
        Authorization: user.token,
      },
    });
    console.log(user.data);
    return res.data.Data;
  } catch (err) {
    throw err;
  }
};

export const addActivity = async (user, activity) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/user/activities",
      activity,
      {
        headers: {
          Authorization: user.token,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteActivity = async (user, activityid) => {
  try {
    const res = await axios.delete("localhost:8000/user/activities", {
      headers: {
        Authorization: user.token,
      },
      data: {
        activityid: activityid,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

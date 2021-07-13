import React from "react";
import styles from "./home.module.css";
import axios from "axios";

import Dashboard from "../../components/home/Dashboard";
import ActivityGroup from "../../components/home/ActivityGroup";

const HomePrivate = () => {
  const [user, setUser] = React.useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/user/id/" + user.userid
      );

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (user) getUserData();
  }, [user]);
  return (
    <div>
      <Dashboard />
      <section className={styles.activitySection}>
        <div className={styles.activitySectionHeader}>
          <h1>Activities</h1>
          <div>
            <button>+ Add Record</button>
          </div>
        </div>
        <ActivityGroup />
      </section>
    </div>
  );
};

export default HomePrivate;

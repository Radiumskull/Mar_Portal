import React from "react";
import styles from "./home.module.css";
import { useSelector } from "react-redux";

import Dashboard from "../../components/home/Dashboard";
import ActivityGroup from "../../components/home/ActivityGroup";
import Dialog from "../../components/Dialog/Dialog";
import GeneralForm from "../../components/Authentication/GeneralForm";

import { getUserData, addActivity } from "../../utils/fetchUtils";

const activityFields = {
  name: { name: "name", type: "text", label: "Name" },
  category: { name: "category", type: "text", label: "Category" },
  date: { name: "category", type: "text", label: "Date" },
  certificate: { name: "category", type: "text", label: "Certificate Date" },
};

const HomePrivate = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = React.useState(null);
  const [dialog, setDialog] = React.useState(false);
  const closeDialog = () => setDialog(false);
  const openDialog = () => setDialog(true);

  console.log(userData);
  console.log(user);

  const fetchUser = async () => {
    try {
      const data = await getUserData(user);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (data) => {
    try {
      await addActivity(user, data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (user) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    if (user) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Dashboard />
      <Dialog active={dialog} closeHandler={closeDialog}>
        <ActivityFormContainer submitHandler={submitHandler} />
      </Dialog>
      <section className={styles.activitySection}>
        <div className={styles.activitySectionHeader}>
          <h1>Activities</h1>
          <div>
            <button className="btn-success" onClick={openDialog}>
              + Add Record
            </button>
          </div>
        </div>
        <ActivityGroup />
        <ActivityGroup />
        <ActivityGroup />
        <ActivityGroup />
      </section>
    </div>
  );
};

export default HomePrivate;

const ActivityFormContainer = ({ submitHandler }) => {
  return (
    <div>
      <h2>Activity Form</h2>
      <GeneralForm fields={activityFields} submitHandler={submitHandler} />
    </div>
  );
};

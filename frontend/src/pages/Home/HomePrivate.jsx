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
  certificate: { name: "certificate", type: "text", label: "Certificate Link" },
};

const HomePrivate = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = React.useState(null);
  const [dialog, setDialog] = React.useState(false);
  const [studentYear, setStudentYear] = React.useState(null);
  const closeDialog = () => setDialog(false);
  const openDialog = () => setDialog(true);

  console.log(userData);
  console.log(user);

  const fetchUser = async () => {
    try {
      const data = await getUserData(user);
      const currentYear = new Date().getFullYear();
      let studentYear = currentYear - parseInt(data.YOP);
      if (studentYear === 0) studentYear = 1;
      setStudentYear(studentYear);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (data) => {
    try {
      console.log(data)
      await addActivity(user, data);
      closeDialog();
    } catch (err) {
      console.log(err);
    }
  };

  const mapActivityGroups = () => {
    const groups = [];
    console.log(studentYear);
    for (let i = 1; i <= studentYear; i++)
      groups.push(
        <ActivityGroup year={i} key={i} yop={parseInt(userData.YOP)} />
      );
    return groups;
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
      <Dashboard user={userData} />
      <section className={styles.activitySection}>
        <div className={styles.activitySectionHeader}>
          <h1>Activities</h1>
          <div>
            <button className="btn-success" onClick={openDialog}>
              + Add Record
            </button>
          </div>
        </div>
      </section>
      {userData && studentYear && mapActivityGroups().map((elem, _) => elem)}
      <Dialog active={dialog} closeHandler={closeDialog}>
        <ActivityFormContainer submitHandler={submitHandler} />
      </Dialog>
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

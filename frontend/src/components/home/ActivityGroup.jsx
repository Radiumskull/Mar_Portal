import React from "react";
import styles from "./home.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ActivityGroup = ({ year, yop }) => {
  const [activities, setActivities] = React.useState(null);
  const [points, setPoints] = React.useState(0);
  const user = useSelector((state) => state.user);
  console.log(year + yop - 1)
  const getActivityYearData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/user/activities/" + (year + yop),
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setActivities(res.data.Data ? res.data.Data : []);
      if (res.data.Data && res.data.Data.length >= 1) {
        setPoints(res.data.Data.length * 5);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (year && user) getActivityYearData();
  }, []);

  console.log(activities);
  return (
    <div className={styles.activityGroup}>
      <div className={styles.activityTitleBar}>
        <h4>Year {year}</h4>
        <span>Points: {points}</span>
      </div>

      {activities && activities.length >= 1 ? (
        activities.map((activity, index) => {
          return <ActivityCard key={index} activity={activity} />;
        })
      ) : (
        <div className={styles.noActivity}>No activities done this year</div>
      )}
    </div>
  );
};

export default ActivityGroup;

const ActivityCard = ({ activity }) => {
  console.log("[DEBUG]", activity);
  const day = dayjs(activity.Date);
  const formattedDate = day.format("DD MMM, YYYY");
  console.log(formattedDate);
  return (
    <div>
      <div className={styles.activityCard}>
        <div>
          <span>
            <label>Name</label>
            <div>{activity.Name}</div>
          </span>
          <span>
            <label>Category</label>
            <div>{activity.Category}</div>
          </span>
        </div>
        <div>
          <span>
            <label>Credit</label>
            <div>5</div>
          </span>
          <span>
            <label>Date</label>
            <div>{formattedDate}</div>
          </span>
        </div>
      </div>
      <hr />
    </div>
  );
};

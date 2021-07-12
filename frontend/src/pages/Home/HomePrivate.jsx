import styles from "./home.module.css";

import Dashboard from "../../components/home/Dashboard";
import ActivityGroup from "../../components/home/ActivityGroup";
const HomePrivate = () => {
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

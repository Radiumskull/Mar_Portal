import styles from "./home.module.css";

const ActivityGroup = () => {
  return (
    <div className={styles.activityGroup}>
      <div className={styles.activityTitleBar}>
        <h4>Year 1</h4>
        <span>Points: 26</span>
      </div>

      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
    </div>
  );
};

export default ActivityGroup;

const ActivityCard = () => {
  return (
    <div>
      <div className={styles.activityCard}>
        <div>
          <span>
            <label>Name</label>
            <div> Tree Plantation</div>
          </span>
          <span>
            <label>Category</label>
            <div> Tree Plantation</div>
          </span>
        </div>
        <div>
          <span>
            <label>Credit</label>
            <div>5</div>
          </span>
          <span>
            <label>Date</label>
            <div>26 July, 2021</div>
          </span>
        </div>
      </div>
      <hr />
    </div>
  );
};

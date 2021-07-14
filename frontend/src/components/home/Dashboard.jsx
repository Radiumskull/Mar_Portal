import styles from "./home.module.css";

const Dashboard = ({ user }) => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.user}>
        <div className={styles.imageContainer}>
          <img
            src="https://dummyimage.com/250/000/000f0f"
            alt="Aritra"
            height="100"
            width="100"
            className={styles.image}
          />
        </div>
        <div>
          <div className={styles.userDetails}>
            <div>{user && user.Name}</div>
            <div>3rd Year, 6th Semester</div>
          </div>

          <div>{user && user.Dept}</div>
        </div>
      </div>

      <div className={styles.userActions}>
        <div style={{ textAlign: "center", width: "100%", margin: "0 auto" }}>
          <label>Batch</label>
          <div className={styles.year}>{user && user.YOP}</div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

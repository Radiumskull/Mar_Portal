import styles from "./home.module.css";

const Dashboard = () => {
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
            <div>Aritra Bhattacharjee</div>
            <div>3rd Year, 6th Semester</div>
          </div>

          <div>Information Technology</div>
        </div>
      </div>

      <div className={styles.userActions}>
        <div>
          <label>Year of Admission</label>
          <div className={styles.year}>2020</div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

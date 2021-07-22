import { Link } from "react-router-dom";

const HomePublic = () => {
  return (
    <div>
      <h1>MAR PORTAL</h1>
      <br />
      <br />
      <h4>Team Members</h4>
      <ul>
        <li>Aritra Bhattacharjee</li>
        <li>Akashdeep Bhattacharya</li>
        <li>Arijit Banerjee</li>
        <li>Divya Kumari</li>
        <li>Jayjit Saha</li>
        <li>Adrita Laha</li>
      </ul>

      <p>
        This is a MAR PORTAL built for our DBMS Lab Micro project. It enables <strong>Menteees</strong> to upload their Activity according to their year and also watch the points in current and previous years. 
      </p>

      <p>
        <Link to="/login">Login</Link> to continue.
      </p>
    </div>
  );
};

export default HomePublic;

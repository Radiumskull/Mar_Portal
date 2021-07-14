import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav className={styles.root}>
      <div className={styles.navbar}>
        <div>
          <Link to="/">
            <h1 className={styles.brand}>MAR PORTAL</h1>
          </Link>
        </div>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/logout">Log out</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

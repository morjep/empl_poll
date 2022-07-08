import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { getUserName, logout } from "../users/usersSlice";
import { useSelector, useDispatch } from "react-redux";

// The navbar should contain a link to the Home page, a link to the
// Leaderboard page, and a link to the New Question page
// At the right side of the navbar the users Avatar and name should be displayed, and
// the user should be able to logout
export const Navbar = () => {
  /* Destructuring the userName and avatarURL from the getUserName selector. */
  const { userName, avatarURL } = useSelector(getUserName);
  console.assert(userName !== null, "userName should not be null");

  /* A hook that allows you to dispatch actions. */
  const dispatch = useDispatch();

  /* Returning the navbar. */
  return (
    <nav className={styles.nav}>
      <div className={styles.navleft}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/leaderboard" className={styles.link}>
          Leaderboard
        </Link>
        <Link to="/add" className={styles.link}>
          New
        </Link>
      </div>
      <div className={styles.navright}>
        <div
          className={styles.avatar}
          style={{
            backgroundImage: `url(${avatarURL})`,
          }}
        ></div>
        <div className={styles.username}>{userName}</div>
        <Link to="/" className={styles.link} onClick={() => dispatch(logout())}>
          Logout
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;

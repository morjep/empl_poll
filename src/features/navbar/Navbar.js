import { Link } from "react-router-dom";

// The navbar should contain a link to the Home page, a link to the
// Leaderboard page, and a link to the New Question page
// At the right side of the navbar the users name should be displayed, and
// the user should be able to logout
export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/add">New</Link>
      User goes here
      <Link to="/">Logout</Link>
    </nav>
  );
};
export default Navbar;

// TODO: Style the navbar

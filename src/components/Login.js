import { useDispatch } from "react-redux";
import { login } from "../app/usersSlice";
import styles from "./login.module.css";

export const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    const name = username.value;
    const pwd = password.value;

    dispatch(login({ name, pwd }));
    e.target.reset();
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Username:</label>
        <input type="text" name="username" />
        <label>Password:</label>
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

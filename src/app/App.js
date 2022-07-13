import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Home } from "../components/Home";
import { NewQuestion } from "../components/NewQuestion";
import { Leaderboard } from "../components/Leaderboard";
import { Question } from "../components/Question";
import { getStatusUsers, fetchUsers, getAuthedUser } from "./usersSlice";
import { getStatusQuestions, fetchQuestions } from "./appSlice";

import { Navbar } from "../components/Navbar";
import { Login } from "../components/Login";

const NoMatch = () => <div>404</div>;

function App() {
  const dispatch = useDispatch();
  const usersStatus = useSelector(getStatusUsers);
  const questionStatus = useSelector(getStatusQuestions);
  const authedUser = useSelector(getAuthedUser);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  useEffect(() => {
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [questionStatus, dispatch]);

  return (
    // <Fragment>
    <div className="App">
      {authedUser && <Navbar />}
      {authedUser === null ? (
        <Login />
      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<NewQuestion />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      )}
    </div>
    // </Fragment>
  );
}

export default App;

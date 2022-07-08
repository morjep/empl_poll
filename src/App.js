import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Questions } from "./features/questions/Questions";
import { getStatusUsers, fetchUsers, getAuthedUser } from "./features/users/usersSlice";
import { getStatusQuestions, fetchQuestions } from "./features/questions/questionsSlice";

import { Navbar } from "./features/navbar/Navbar";
import { Login } from "./features/users/Login";

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

  // TODO: Add route to the leaderboard
  // TODO: Add route to the new question page
  // TODO: Add route to the questions page with specific question id

  return (
    <Fragment>
      <div className="App">
        {authedUser && <Navbar />}
        <Routes>
          {authedUser ? (
            <Route path="/" exact element={<Questions />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;

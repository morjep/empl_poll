import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Questions } from "./features/questions/Questions";
import { getStatusUsers, fetchUsers } from "./features/users/usersSlice";
import { getStatusQuestions, fetchQuestions } from "./features/questions/questionsSlice";

import { Navbar } from "./features/navbar/Navbar";

function App() {
  const dispatch = useDispatch();
  const usersStatus = useSelector(getStatusUsers);
  const questionStatus = useSelector(getStatusQuestions);

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
  // TODO: Add route to the login page (conditionally if no authedUser)
  // TODO: Add route to the questions page with specific question id

  return (
    <Fragment>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Questions />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;

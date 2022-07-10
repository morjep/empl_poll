import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Questions } from "./features/questions/Questions";
import { NewQuestion } from "./features/questions/NewQuestion";
import { Leaderboard } from "./features/questions/Leaderboard";
import { Question } from "./features/questions/Question";
import { getStatusUsers, fetchUsers, getAuthedUser } from "./features/users/usersSlice";
import { getStatusQuestions, fetchQuestions } from "./features/questions/questionsSlice";

import { Navbar } from "./features/navbar/Navbar";
import { Login } from "./features/users/Login";

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
          <Route exact path="/" element={<Questions />} />
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

// {authedUser && <Navbar />}
//         <Routes>
//           <Route exact path="/" element={authedUser ? <Questions /> : <Login />} />
//           <Route path="/add" element={authedUser ? <NewQuestion /> : <Navigate replace to="/" />} />
//           <Route
//             path="/leaderboard"
//             element={authedUser ? <Leaderboard /> : <Navigate replace to="/" />}
//           />
//           <Route
//             exact
//             path="/question/:id"
//             element={authedUser ? <Poll /> : <Navigate replace to="/" />}
//           />
//         </Routes>

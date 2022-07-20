import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Flex, Heading } from "@chakra-ui/react";

import { Home } from "../components/Home";
import { NewQuestion } from "../components/NewQuestion";
import { Leaderboard } from "../components/Leaderboard";
import { Question } from "../components/Question";
import { statusUsers, fetchUsers, authedUser } from "./appSlice";
import { statusQuestions, fetchQuestions } from "./appSlice";

import { Navbar } from "../components/Navbar";
import { Login } from "../components/Login";

const NoMatch = () => (
  <Flex justify={"center"} m={15}>
    <Heading>404 - Page not found!</Heading>
  </Flex>
);

function App() {
  const dispatch = useDispatch();
  const usersStatus = useSelector(statusUsers);
  const questionStatus = useSelector(statusQuestions);
  const user = useSelector(authedUser);

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

  function RequireAuth({ children }) {
    return user !== null ? children : <Login />;
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RequireAuth>
                <Navbar />
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/add"
            element={
              <RequireAuth>
                <Navbar />
                <NewQuestion />
              </RequireAuth>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <RequireAuth>
                <Navbar />
                <Leaderboard />
              </RequireAuth>
            }
          />
          <Route
            path="/question/:id"
            element={
              <RequireAuth>
                <Navbar />
                <Question />
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={
              <RequireAuth>
                <Navbar />
                <NoMatch />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;

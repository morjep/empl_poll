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

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        {user && <Navbar />}
        {user === null ? (
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
    </ChakraProvider>
  );
}

export default App;

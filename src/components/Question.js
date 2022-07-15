import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { allQuestionsAsArray, updateQuestionVote } from "../app/appSlice";
import {
  getAuthedUser,
  saveUserAnswer,
  getAnsweredQuestionsAsArray,
  getAnswers,
  userInfo,
} from "../app/appSlice";
import { Link } from "react-router-dom";

const Choice = ({ text, handleClick, answered, choice, votes, percentage }) => {
  let gradient = "linear(to-br, green.200, teal.200)";
  if (answered && !choice) {
    gradient = "linear(to-br, gray.100, gray.200)";
  }
  // TODO: for answered polls show how many voted for the option and the percentage of total
  return (
    <Flex
      direction={"column"}
      align={"center"}
      m={15}
      p={5}
      rounded={"lg"}
      bg={"white"}
      boxShadow={"2xl"}
      _hover={
        !answered && {
          bg: "gray.100",
          boxShadow: "dark-lg",
        }
      }
      bgGradient={gradient}
      onClick={!answered && handleClick}
    >
      <Heading fontSize={"lg"}>{text}</Heading>
      {answered && (
        <Text p={2}>
          Votes: {votes} ({percentage}%)
        </Text>
      )}
    </Flex>
  );
};

export const Question = () => {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const qid = params.id;
  const allQuestions = useSelector(allQuestionsAsArray);
  const authedUser = useSelector(getAuthedUser);
  const { userName, avatarURL } = useSelector(userInfo);

  const question = allQuestions.find((question) => question.id === qid);
  const answeredQuestions = useSelector(getAnsweredQuestionsAsArray);
  const answered = answeredQuestions.includes(qid);
  const answers = useSelector(getAnswers);
  const answer = answers[qid];
  const answerText = answer === "optionOne" ? question.optionOne.text : question.optionTwo.text;

  if (!question) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  }

  const handleVote = (answer) => {
    // TODD : Should only be one dispatch
    !answered && dispatch(updateQuestionVote({ authedUser, qid, answer }));
    !answered && dispatch(saveUserAnswer({ authedUser, qid, answer }));
    //navigate("/");
  };

  const handleVoteOne = () => {
    handleVote("optionOne");
  };

  const handleVoteTwo = () => {
    handleVote("optionTwo");
  };

  return (
    <Flex
      direction="column"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(to-br, blue.200, blue.600)"
    >
      <Flex direction="row">
        <Flex direction="column" boxSize={"md"} rounded={"lg"} justify={"top"} align="center">
          <Heading color="blue.100" mb={5} size={"2xl"}>
            Poll by {question.author}
          </Heading>
          <Avatar size={"2xl"} src={avatarURL} mb={10} />
        </Flex>
        <Flex boxSize={"md"} rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8} justify={"center"}>
          <Stack spacing={8}>
            <Heading fontSize={"4xl"} color={"teal.400"}>
              Would you rather....?
            </Heading>

            <Choice
              text={question.optionOne.text}
              handleClick={handleVoteOne}
              answered={answered}
              choice={answer === "optionOne" ? true : false}
              votes={10}
              percentage={13}
            />

            <Choice
              text={question.optionTwo.text}
              handleClick={handleVoteTwo}
              answered={answered}
              choice={answer === "optionTwo" ? true : false}
              votes={10}
              percentage={13}
            />
          </Stack>
        </Flex>
      </Flex>
      {answered && (
        <Flex p={8} justify={"center"} direction="column">
          <Heading color="blue.100" mb={5} size={"2xl"}>
            Your choice:
          </Heading>
          <Heading
            bgGradient="linear(to-r, yellow.200, teal.200)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            {answerText}
          </Heading>
        </Flex>
      )}
    </Flex>
  );
};
export default Question;

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Flex, Text, Stack, Heading } from "@chakra-ui/react";

import { allQuestionsAsArray } from "../app/appSlice";
import {
  getAuthedUser,
  saveUserAnswer,
  getAnsweredQuestionsAsArray,
  getAnswers,
  userInfo,
} from "../app/appSlice";

const Choice = ({ text, handleClick, showVotes, hover, answered, faded, votes, percentage }) => {
  let gradient = "linear(to-br, green.200, teal.200)";
  let color = "black.500";
  if (faded) {
    gradient = "linear(to-br, gray.100, gray.200)";
    color = "gray.500";
  }

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
        hover && {
          bg: "blue.200",
          boxShadow: "dark-lg",
        }
      }
      bgGradient={gradient}
      onClick={handleClick}
    >
      <Heading fontSize={"lg"} color={color}>
        {text}
      </Heading>
      {showVotes && (
        <Text p={2}>
          Votes: {votes} ({percentage}%)
        </Text>
      )}
    </Flex>
  );
};

export const Question = () => {
  const dispatch = useDispatch();
  const allQuestions = useSelector(allQuestionsAsArray);
  const authedUser = useSelector(getAuthedUser);
  const answeredQuestions = useSelector(getAnsweredQuestionsAsArray);
  const answers = useSelector(getAnswers);
  const { userName, avatarURL } = useSelector(userInfo);

  let params = useParams();
  const qid = params.id;
  const question = allQuestions.find((question) => question.id === qid);
  if (!question) {
    return (
      <Flex justify={"center"} m={15}>
        <Heading>404 - Question not found!</Heading>
      </Flex>
    );
  }

  const answered = answeredQuestions.includes(qid);
  const answer = answers[qid];
  const answerText = answer === "optionOne" ? question.optionOne.text : question.optionTwo.text;

  let votesOptionOne = question.optionOne.votes.length;
  let votesOptionTwo = question.optionTwo.votes.length;

  if (answered && answer === "optionOne") {
    votesOptionOne++;
  }

  if (answered && answer === "optionTwo") {
    votesOptionTwo++;
  }

  const percentageOptionOne =
    votesOptionOne + votesOptionTwo > 0
      ? (votesOptionOne / (votesOptionOne + votesOptionTwo)) * 100
      : 0;

  const percentageOptionTwo =
    votesOptionOne + votesOptionTwo > 0
      ? (votesOptionTwo / (votesOptionOne + votesOptionTwo)) * 100
      : 0;

  const handleVote = (answer) => {
    !answered && dispatch(saveUserAnswer({ authedUser, qid, answer }));
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
              handleClick={!answered ? handleVoteOne : undefined}
              showVotes={answered}
              hover={!answered}
              answered={answered}
              faded={answered && !(answer === "optionOne" ? true : false)}
              votes={votesOptionOne}
              percentage={percentageOptionOne.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            />

            <Choice
              text={question.optionTwo.text}
              handleClick={!answered ? handleVoteTwo : undefined}
              showVotes={answered}
              hover={!answered}
              answered={answered}
              faded={answered && !(answer === "optionTwo" ? true : false)}
              votes={votesOptionTwo}
              percentage={percentageOptionTwo.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
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

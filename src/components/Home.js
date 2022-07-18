import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getStatusQuestions, allQuestionsAsArray } from "../app/appSlice";
import { getAnsweredQuestionsAsArray } from "../app/appSlice";

import styles from "./questions.module.css";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

// TODO: Check rubric wrt ordering of cards
const CardContainer = ({ heading, questions }) => {
  return (
    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} width={"4xl"} p={8} m={4}>
      <Heading fontSize={"4xl"} color={"teal.400"} borderBottom="1px" borderColor="blue.200">
        {heading}
      </Heading>
      <Flex flexWrap={"wrap"} mt={4}>
        {questions.map((question) => (
          <Link to={`/question/${question.id}`} key={question.id}>
            <Box
              m={15}
              p={10}
              rounded={"lg"}
              bg={"white"}
              boxShadow={"2xl"}
              _hover={{
                bg: "blue.200",
                boxShadow: "dark-lg",
              }}
              bgGradient="linear(to-br, green.200, teal.200)"
            >
              <Heading fontSize={"lg"}>{question.author}</Heading>
              <Text>{formatDate(question.timestamp)}</Text>
            </Box>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export const Home = () => {
  const questionStatus = useSelector(getStatusQuestions);
  const allQuestionsArray = useSelector(allQuestionsAsArray);
  const answeredQuestionsArray = useSelector(getAnsweredQuestionsAsArray);

  if (questionStatus === "loading") {
    return <div>Loading</div>;
  }

  if (questionStatus === "failed") {
    return <div>Oops - something unexpected happened. Please try again.</div>;
  }

  const answeredQuestions = allQuestionsArray.filter((question) =>
    answeredQuestionsArray.includes(question.id)
  );

  const newQuestions = allQuestionsArray.filter(
    (question) => !answeredQuestionsArray.includes(question.id)
  );

  return (
    <Flex
      direction="column"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(to-br, blue.200, blue.600)"
    >
      <CardContainer heading="New Questions" questions={newQuestions} />
      <CardContainer heading="Answered Questions" questions={answeredQuestions} />
    </Flex>
  );
};

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveNewQuestion } from "../app/appSlice";
import { authedUser, userInfo } from "../app/appSlice";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export const NewQuestion = () => {
  const dispatch = useDispatch();
  const user = useSelector(authedUser);
  const { userName, avatarURL } = useSelector(userInfo);

  let navigate = useNavigate();

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = user;
    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: author,
    };
    dispatch(saveNewQuestion(question));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  const handleOptionOneChange = (e) => {
    setOptionOne(e.target.value);
  };

  const handleOptionTwoChange = (e) => {
    setOptionTwo(e.target.value);
  };

  return (
    <Flex
      direction="row"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(to-br, blue.200, blue.600)"
    >
      <Flex direction="column" boxSize={"md"} rounded={"lg"} justify={"top"} align="center">
        <Heading color="blue.100" mb={5} size={"2xl"}>
          Create new poll
        </Heading>
        <Avatar size={"2xl"} src={avatarURL} mb={10} />
      </Flex>
      <Flex
        boxSize={"md"}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        justify={"center"}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={8}>
            <Heading fontSize={"4xl"} color={"teal.400"}>
              Would you rather....?
            </Heading>

            <FormControl id="optionOne" isRequired>
              <FormLabel>First option</FormLabel>
              <Input type="text" onChange={handleOptionOneChange} value={optionOne} />
            </FormControl>
            <FormControl id="optionTwo" isRequired>
              <FormLabel>Second option</FormLabel>
              <Input type="text" onChange={handleOptionTwoChange} value={optionTwo} />
            </FormControl>
            <Button
              type="submit"
              bg={"teal.400"}
              color={"white"}
              _hover={{
                bg: "teal.600",
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
};
export default NewQuestion;

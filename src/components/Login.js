import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { login, authStatus } from "../app/appSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(authStatus);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let userAlert = status === "User not found" ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ name: username, pwd: password }));
      setUsername("");
      setPassword("");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"top"}
      bgGradient="linear(to-br, blue.200, blue.600)"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {userAlert && (
                <Alert role="loginError" status="error">
                  <AlertIcon />
                  Incorrect username or password
                </Alert>
              )}
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  role="username"
                  name="username"
                  type="text"
                  onChange={handleUsernameChange}
                  value={username}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  role="password"
                  name="password"
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </FormControl>
              <Button
                role="login"
                type="submit"
                name="login"
                rightIcon={<ArrowForwardIcon />}
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.600",
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

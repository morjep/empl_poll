import { Link } from "react-router-dom";
import { Flex, Text, Box, Spacer, useColorModeValue, Button, Avatar } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { userInfo, logout } from "../app/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { buildQueries } from "@testing-library/react";

const links = [
  { name: "Home", href: "/" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "New", href: "/add" },
];

const LinkTo = ({ name, link }) => {
  return (
    <Link to={link}>
      <Text
        fontSize="lg"
        color={"blue.400"}
        _hover={{
          color: "blue.600",
          borderBottom: "1px",
          borderColor: "blue.600", // fontWeight: "bold",
        }}
      >
        {name}
      </Text>
    </Link>
  );
};

export const Navbar = () => {
  const { userName, avatarURL } = useSelector(userInfo);
  const dispatch = useDispatch();

  return (
    <Flex as="nav" borderBottom="1px" borderColor="blue.200">
      <Box m={4}>
        <HStack spacing="24px">
          {links.map((link) => (
            <LinkTo key={link.name} name={link.name} link={link.href} />
          ))}
        </HStack>
      </Box>
      <Spacer />
      <Box m={4}>
        <HStack spacing="2px">
          <Avatar size={"md"} src={avatarURL} />
          <Text color={"blue.600"} fontWeight={"bolder"} fontSize="lg" pl={5}>
            {userName}
          </Text>
        </HStack>
      </Box>
      <Spacer />
      <Box m={4}>
        <Link to="/" onClick={() => dispatch(logout())}>
          <Button
            type="submit"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.600",
            }}
          >
            Logout
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};
export default Navbar;

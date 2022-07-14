import { useSelector } from "react-redux";
import { userStatsArraySorted } from "../app/appSlice";
import {
  Flex,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

export const Leaderboard = () => {
  const usersStats = useSelector(userStatsArraySorted);

  console.log("usersStats: ", usersStats);
  return (
    <Flex
      direction="column"
      align="center"
      minH={"95vh"}
      justify={"center"}
      bgGradient="linear(to-br, blue.200, blue.600)"
    >
      <Heading color="blue.100" mb={5} size={"2xl"}>
        Leaderboard
      </Heading>
      <Flex minWidth="max-content" maxWidth={800}>
        <TableContainer>
          <Table variant="simple" colorScheme="blue" size="md">
            <TableCaption>The poll score board</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={"2xl"} color={"blue.100"}>
                  User
                </Th>
                <Th fontSize={"2xl"}>Questions</Th>
                <Th fontSize={"2xl"}>Answers</Th>
                <Th fontSize={"2xl"} color={"teal.200"}>
                  Score
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersStats.map((user) => (
                <Tr key={user.user}>
                  <Td fontWeight={"bold"} color={"blue.100"}>
                    {user.user}
                  </Td>
                  <Td fontWeight={"bold"} color={"gray.600"}>
                    {user.questions}
                  </Td>
                  <Td fontWeight={"bold"} color={"gray.600"}>
                    {user.answers}
                  </Td>
                  <Td fontWeight={"bold"} color={"teal.200"}>
                    {user.score}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};
export default Leaderboard;

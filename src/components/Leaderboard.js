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
  Tfoot,
} from "@chakra-ui/react";

export const Leaderboard = () => {
  const usersStats = useSelector(userStatsArraySorted);

  console.log("usersStats: ", usersStats);
  return (
    <Flex direction="column" align="center">
      <Heading color="blue.400" mt={25} mb={5}>
        Leaderboard
      </Heading>
      <Flex minWidth="max-content" maxWidth={800}>
        <TableContainer>
          <Table variant="striped" colorScheme="blue" size="md">
            <TableCaption>The poll score board</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Questions</Th>
                <Th>Answers</Th>
                <Th>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersStats.map((user) => (
                <Tr key={user.user}>
                  <Td>{user.user}</Td>
                  <Td>{user.questions}</Td>
                  <Td>{user.answers}</Td>
                  <Td>{user.score}</Td>
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

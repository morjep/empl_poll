import { useSelector } from "react-redux";
import { userStatsArraySorted } from "../app/appSlice";

export const Leaderboard = () => {
  const usersStats = useSelector(userStatsArraySorted);

  console.log("usersStats: ", usersStats);
  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Questions</th>
            <th>Answers</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {usersStats.map((user) => (
            <tr key={user.user}>
              <td>{user.user}</td>
              <td>{user.questions}</td>
              <td>{user.answers}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Leaderboard;

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allQuestionsAsArray, questionVote } from "./questionsSlice";
import {
  getAuthedUser,
  userVote,
  getAnsweredQuestionsAsArray,
  getAnswers,
} from "../users/usersSlice";
import { Link } from "react-router-dom";

export const Question = () => {
  let params = useParams();
  const questionId = params.id;
  const allQuestions = useSelector(allQuestionsAsArray);
  const authedUser = useSelector(getAuthedUser);
  const dispatch = useDispatch();

  const question = allQuestions.find((question) => question.id === questionId);
  const answeredQuestions = useSelector(getAnsweredQuestionsAsArray);
  const answered = answeredQuestions.includes(questionId);
  const answers = useSelector(getAnswers);

  const answerText =
    answers[questionId] === "optionOne" ? question.optionOne.text : question.optionTwo.text;

  if (!question) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  }

  const handleVote = (option) => {
    dispatch(questionVote({ questionId: questionId, author: authedUser, option }));
    dispatch(userVote({ userId: authedUser, questionId: questionId, option }));
  };

  const handleVoteOne = () => {
    handleVote("optionOne");
  };

  const handleVoteTwo = () => {
    handleVote("optionTwo");
  };

  return (
    <div>
      <h1>Poll by {question.author}</h1>
      <div> AVATAR </div>
      <div> Would you rather</div>
      <div> Option #1: {question.optionOne.text}</div>
      {!answered && (
        <button type="button" onClick={handleVoteOne}>
          <Link to={"/"}>Option #1</Link>
        </button>
      )}
      <div> Option #2: {question.optionTwo.text}</div>
      {!answered && (
        <button type="button" onClick={handleVoteTwo}>
          <Link to={"/"}>Option #2</Link>
        </button>
      )}
      {answered && <h2>You have already answered this question!</h2>}
      {answered && <h3>Your choice: {answerText}</h3>}
    </div>
  );
};
export default Question;

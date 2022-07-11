import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allQuestionsAsArray, questionVote } from "./questionsSlice";
import {
  getAuthedUser,
  userVote,
  getAnsweredQuestionsAsArray,
  getAnswers,
  getUserName,
} from "../users/usersSlice";
import { Link } from "react-router-dom";

import styles from "./Question.module.css";

export const Question = () => {
  let params = useParams();
  const questionId = params.id;
  const allQuestions = useSelector(allQuestionsAsArray);
  const authedUser = useSelector(getAuthedUser);

  /* Destructuring the userName and avatarURL from the getUserName selector. */
  const { userName, avatarURL } = useSelector(getUserName);
  console.assert(userName !== null, "userName should not be null");

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
    <section className={styles.question}>
      <h1>Poll by {question.author}</h1>
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${avatarURL})`,
        }}
      ></div>
      <h2> Would you rather</h2>
      <div className={styles.options}>
        <div className={styles.option}>
          <div> Option #1: {question.optionOne.text}</div>
          {!answered && (
            <button type="button" onClick={handleVoteOne}>
              <Link to={"/"}>Option #1</Link>
            </button>
          )}
        </div>
        <div className={styles.option}>
          <div> Option #2: {question.optionTwo.text}</div>
          {!answered && (
            <button type="button" onClick={handleVoteTwo}>
              <Link to={"/"}>Option #2</Link>
            </button>
          )}
        </div>
      </div>

      <div className={styles.answer}>
        {answered && <h2>You have already answered this question!</h2>}
        {answered && <h3>Your choice: {answerText}</h3>}
      </div>
    </section>
  );
};
export default Question;

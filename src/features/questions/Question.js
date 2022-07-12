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

import styles from "./questions.module.css";

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
  const answer = answers[questionId];
  const answerText = answer === "optionOne" ? question.optionOne.text : question.optionTwo.text;

  if (!question) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  }

  const handleVote = (option) => {
    !answered && dispatch(questionVote({ questionId: questionId, author: authedUser, option }));
    !answered && dispatch(userVote({ userId: authedUser, questionId: questionId, option }));
  };

  const handleVoteOne = () => {
    handleVote("optionOne");
  };

  const handleVoteTwo = () => {
    handleVote("optionTwo");
  };

  if (answered) {
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
          <div className={answer === "optionOne" ? styles.cardChoice : styles.cardNotChoice}>
            <h3> Option 1 </h3>
            <h2> {question.optionOne.text}</h2>
          </div>

          <div className={answer === "optionTwo" ? styles.cardChoice : styles.cardNotChoice}>
            <h3> Option 2 </h3>
            <h2>{question.optionTwo.text}</h2>
          </div>
        </div>

        <div className={styles.answer}>
          {answered && <h2>You have already answered this question!</h2>}
          {answered && <h2>Your choice was: "{answerText}"</h2>}
        </div>
      </section>
    );
  }

  if (!answered) {
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
          <Link to={"/"} className={styles.card} onClick={handleVoteOne}>
            <div>
              <h3> Option 1 </h3>
              <h2> {question.optionOne.text}</h2>
            </div>
          </Link>

          <Link to={"/"} className={styles.card} onClick={handleVoteTwo}>
            <div>
              <h3> Option 2 </h3>
              <h2>{question.optionTwo.text}</h2>
            </div>
          </Link>
        </div>
      </section>
    );
  }
};
export default Question;

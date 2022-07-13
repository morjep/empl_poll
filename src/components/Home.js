import { useSelector } from "react-redux";
import { getStatusQuestions, allQuestionsAsArray } from "../app/appSlice";
import { getAnsweredQuestionsAsArray } from "../app/usersSlice";
import { Link } from "react-router-dom";

import styles from "./questions.module.css";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

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
    <div>
      <div className={styles.questions}>
        <h2> New questions </h2>
        <div className={styles.cardGroup}>
          {newQuestions.map((question) => (
            <Link to={`/question/${question.id}`} className={styles.card} key={question.id}>
              <article>
                <h3>{question.author}</h3>
                <p>{formatDate(question.timestamp)}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.questions}>
        <h2> Answered questions </h2>
        <div className={styles.cardGroup}>
          {answeredQuestions.map((question) => (
            <Link to={`/question/${question.id}`} className={styles.card} key={question.id}>
              <article>
                <h3>{question.author}</h3>
                <p>{formatDate(question.timestamp)}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

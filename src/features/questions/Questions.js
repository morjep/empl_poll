import { useSelector } from "react-redux";
import { getStatusQuestions, allQuestionsAsArray } from "./questionsSlice";
import { getAnsweredQuestionsAsArray } from "../users/usersSlice";
import { Link } from "react-router-dom";

import styles from "./Questions.module.css";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export const Questions = () => {
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
      <h2> New questions </h2>
      <div className={styles.cardGroup}>
        {newQuestions.map((question) => (
          <article className={styles.card} key={question.id}>
            <h3>{question.author}</h3>
            <p>{formatDate(question.timestamp)}</p>
            <button>
              <Link to={`/question/${question.id}`}>Answer</Link>
            </button>
          </article>
        ))}
      </div>
      <h2> Answered questions </h2>
      <div className={styles.cardGroup}>
        {answeredQuestions.map((question) => (
          <article className={styles.card} key={question.id}>
            <h3>{question.author}</h3>
            <p>{formatDate(question.timestamp)}</p>
            <button>
              <Link to={`/question/${question.id}`}>Show</Link>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

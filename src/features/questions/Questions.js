import React from "react";
import { useSelector } from "react-redux";
import { getStatusQuestions, allQuestionsAsArray } from "./questionsSlice";
import { getAnsweredQuestions } from "../users/usersSlice";

import styles from "./Questions.module.css";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export const Questions = () => {
  const questionStatus = useSelector(getStatusQuestions);
  const allQuestions = useSelector(allQuestionsAsArray);
  const answeredQuestionsArray = useSelector(getAnsweredQuestions);
  console.log(answeredQuestionsArray);

  if (questionStatus === "loading") {
    return <div>Loading</div>;
  }

  if (questionStatus === "failed") {
    return <div>Oops - something unexpected happened. Please try again.</div>;
  }

  const answeredQuestions = allQuestions.filter((question) =>
    answeredQuestionsArray.includes(question.id)
  );
  const newQuestions = allQuestions.filter(
    (question) => !answeredQuestionsArray.includes(question.id)
  );
  console.log(answeredQuestions);

  return (
    <div>
      <h2> New questions </h2>
      <div className={styles.cardGroup}>
        {newQuestions.map((question) => (
          <article className={styles.card} key={question.id}>
            <h3>{question.author}</h3>
            <p>{formatDate(question.timestamp)}</p>
            <button>Answer</button>
          </article>
        ))}
      </div>
      <h2> Answered questions </h2>
      <div className={styles.cardGroup}>
        {answeredQuestions.map((question) => (
          <article className={styles.card} key={question.id}>
            <h3>{question.author}</h3>
            <p>{formatDate(question.timestamp)}</p>
            <button>Show</button>
          </article>
        ))}
      </div>
    </div>
  );
};

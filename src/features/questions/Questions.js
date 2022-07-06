import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllQuestions,
  fetchQuestions,
  getStatusQuestions,
  allQuestionsAsArray,
} from "./questionsSlice";
import styles from "./Questions.module.css";

export const Questions = () => {
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const questionStatus = useSelector(getStatusQuestions);
  const allQuestions = useSelector(allQuestionsAsArray);
  const error = useSelector((state) => state.questions.error);

  console.log(questionStatus);

  useEffect(() => {
    console.log("useEffect", questionStatus);
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [questionStatus, dispatch]);

  let content;

  if (questionStatus === "loading") {
    content = <div>Loading</div>;
  }
  if (questionStatus === "succeeded") {
    // render questions as <articles>
    content = allQuestions.map((question) => (
      <article className={styles.card} key={question.id}>
        <h3>{question.author} asks:</h3>
        <p>Would you rather {question.optionOne.text}?</p>
        <p>Or {question.optionTwo.text}?</p>
      </article>
    ));
  }
  if (questionStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h1> Questions </h1>
      {content}
    </div>
  );
};
